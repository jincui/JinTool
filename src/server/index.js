
const socketIO  = require('socket.io')
const _ = require('lodash')


module.exports.init = (server) => {
  const io = socketIO.listen(server);
  let userCount = 0;
  const userList = [];
  io.on('connection', function (socket) {
    console.log('a user connnected')
    const number = ++userCount;
    userList.push({ id: number, name: `${number}号小伙伴` })
    io.emit('users', { user: userList, msg: `欢迎${number}号小伙伴加入` });

    socket.on('disconnect', () => {
      console.log('a user disconnnected')
      userList.splice(number - 1, 1);
      io.emit('users', { user: userList, msg: `${number}号小伙伴离开了` });
    })

    socket.on('input', (content) => {

    })
  })
}

