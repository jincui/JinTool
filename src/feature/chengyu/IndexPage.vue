<template lang="pug">
div
  .info-bar
    span 当前词库共有成语：{{list.length + covered.length}}
    span 剩余可用：{{list.length}}
    span 用户数：{{users.length}}
  .container
    .user-list-view
      user-list(:users="users" :turn="currentTurn")
    .chat-battle-view
      chat-battle-box(:data="chatList" :user="currentUser")
      p.tip {{tip}}
      .input-box(v-show="currentUser && currentTurn === currentUser.id")
        i-input(placeholder="到你了" v-model="input" v-on:keypress.enter="send")
        i-button(v-on:click="pass") 过
        i-button(v-on:click="send") 提交
</template>

<script>
import _ from 'lodash';
import UserList from './UserList';
import ChatBattleBox from './ChatBattleBox';
import * as utils from './utils';

export default {
  data() {
    return {
      users: [
        { id: 0, name: '小Q', ai: true },
        { id: 1, name: '金金本人' },
      ],
      currentUser: { id: 1, name: '金金本人' },
      currentTurn: 0,
      list: [], // 成语库
      covered: [], // 已使用
      chatList: [
        // { id: 0, name: '小Q', content: '一心一意' },
        // { id: 1, name: '金金本人', content: '一心一意' },
      ], // 聊天内容
      input: undefined,
      tip: '游戏开始',
    };
  },
  components: {
    'user-list': UserList,
    'chat-battle-box': ChatBattleBox,
  },
  created() {
    this.list = utils.getData();
    this.generate();
  },
  methods: {
    send() {
      // check input valid
      if (this.list.indexOf(this.input) === -1) {
        this.tip = '该成语不存在!';
        return;
      }
      const lastC = _.last(_.get(_.last(this.chatList), 'content'));
      if (lastC && !_.startsWith(this.input, lastC)) {
        this.tip = '回答错误，请继续';
        return;
      }
      // valid -> send to chatbox -> update turn -> clear input ->
      if (this.addChatList(this.input, this.currentUser.name)) this.changeTurn();
      this.input = undefined;
      // invalid -> related tip
    },
    pass() {
      this.changeTurn(false);
    },

    addChatList(content, name, tip) {
      this.chatList.push({
        id: this.chatList.length,
        name,
        content,
        tip,
      });
      this.covered.push(content);
      this.list = _.without(this.list, content);
      if (!this.list.length) {
        this.tip = '游戏结束';
        this.currentTurn = undefined;
        return false;
      }

      const lastC = _.last(content);
      if (!_.find(this.list, l => _.startsWith(l, lastC))) {
        const c = _.sample(this.list);
        return this.addChatList(c, '系统', `"${content}"无法续接，已自动切换！`);
      }
      return true;
    },

    generate() {
      const lastC = _.last(_.get(_.last(this.chatList), 'content'));
      const content = !lastC ? _.sample(this.list) : _.find(this.list, l => _.startsWith(l, lastC));
      if (!content) {
        this.tip = '无法继续';
        return;
      }
      if (this.addChatList(content, '小Q')) this.changeTurn();
    },

    changeTurn(wait = true) {
      this.currentTurn = (this.currentTurn + 1) % this.users.length;
      const user = this.users[this.currentTurn];
      if (user.ai) {
        setTimeout(this.generate, wait ? 1000 : 0);
      }
      this.tip = `等待${user.name}回答...`;
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  display flex
  padding 20px
  .user-list-view
    width 200px
  .chat-battle-view
    flex 1

</style>
