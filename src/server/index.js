
const socketIO  = require('socket.io')
const _ = require('lodash')
const data = require('./chengyu.json').data;


module.exports.init = (server) => {
  const io = socketIO.listen(server);
  let userCount = 0;
  let userList = [{ id: 'Q', name: '小Q', ai: true }];
  let currentTurn = 0;
  let validData = _.clone(data);
  let coveredData = []
  let last = null
  let gameStart = false;

  function getStatus() {
    return { total: data.length, valid: validData.length, gaming: gameStart }
  }

  function getId() {
    return new Date().getTime();
  }


  io.on('connection', function (socket) {

    function addContent(content, name, tip) {
      // is usered
      if (!tip) {
        if (_.includes(coveredData, content)) {
          socket.emit('msg', { id: getId(), type: 'error', msg: '该成语已被使用过，请更换' });
          return false;
        }
        if (!_.includes(validData, content)) {
          socket.emit('msg', { id: getId(), type: 'error', msg: '该成语不在库中（当前成语词库可能比较老旧，见谅）' });
          return false;
        }
        if (last && !_.startsWith(content, _.last(last))) {
          socket.emit('msg', { id: getId(), type: 'error', msg: `您的输入无法续接"${last}"` });
          return false;
        }
      }
      last = content;
  
      io.emit('input', { name, content, tip, id: new Date().getTime() })

      coveredData.push(content)
      _.remove(validData, d => d === content);

      io.emit('status', getStatus())

      if (!validData.length) {
        socket.emit('msg', { id: getId(), type: 'info', msg: '词库已全部使用完，游戏结束，大家真厉害！' });
        return false;
      }
      // check can
      const lastC = _.last(last);
      if (!_.find(validData, v => _.startsWith(v, lastC))) {
        const c = _.sample(validData)
        return addContent(c, '系统', `${last}无法续接，已自动切换`)
      }

      return true;
    }

    function changeTurn() {
      currentTurn = (currentTurn + 1) % userList.length;
      io.emit('turn', currentTurn);
      if (userList[currentTurn].ai) {
        const content = _.find(validData, v => _.startsWith(v, _.last(last)));
        const res = addContent(content, '小Q')
        if (res) changeTurn();
      }
    }

    console.log('a user connnected')
    const number = ++userCount;
    const name = `${number}号小伙伴`;
    userList.push({ id: number, name })
    socket.emit('status', getStatus())
    io.emit('users', { users: userList, msg: { type: 'info', id: getId(), msg: `欢迎${number}号小伙伴加入 ${gameStart ? '' : '等待游戏开始'}` } });
    socket.emit('user', _.last(userList));
    if (gameStart) {
      socket.emit('msg', { id: getId(), type: 'info', msg: `等待${userList[currentTurn].name}回答，当前成语“${last}”`})
    }
    socket.on('disconnect', () => {
      console.log('a user disconnnected')
      userCount-=1;
      _.remove(userList, u => u.id === number);
      io.emit('users', { users: userList, msg: { type: 'info', id: getId(), msg: `${number}号小伙伴离开了` } });
    })

    socket.on('start', (userId) => {
      console.log('game start');
      gameStart = true;
      validData = _.clone(data);
      coveredData = []
      last = null
      const index = _.findIndex(userList, ['id', userId]);
      if (index !== 1) {
        socket.emit('msg', { type: 'error', msg: '只有队长可以点击开始', id: getId() });
        return;
      }
      io.emit('msg', { type: 'info', msg: '游戏开始，由小Q先出题', id: getId() });
      const content = _.sample(validData);
      const res = addContent(content, '小Q')
      if(res) changeTurn();
    })

    socket.on('input', (content) => {
      console.log(`user input ${content}`)
      const res = addContent(content, name)
      if (res) changeTurn();
    })

    socket.on('pass', () => {
      changeTurn();
    })
  })
}

