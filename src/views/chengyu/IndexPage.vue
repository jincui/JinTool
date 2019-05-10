<template lang="pug">
div
  .info-bar
    span 当前词库共有成语：{{status.total}}
    span 剩余可用：{{status.valid}}
    span 用户数：{{users.length}}
    button(@click="start" v-if="!status.gaming") 开始
  .container
    .user-list-view
      user-list(:users="users" :turn="currentTurn")
    .chat-battle-view
      chat-battle-box(:data="chatList" :user="currentUser")
      p.tip {{tip}}
      .input-box(v-show="currentUser && currentTurn === currentUser.id")
        input(placeholder="到你了" v-model="input" v-on:keypress.enter="send")
        button(v-on:click="pass") 过
        button(v-on:click="send") 提交
</template>

<script>
import _ from 'lodash';
import UserList from './UserList';
import ChatBattleBox from './ChatBattleBox';
import * as utils from './utils';
// import io from './socket.io.slim'

export default {
  data() {
    return {
      users: [],
      status: { total: 0, valid: 0 },
      currentUser: {},
      currentTurn: 0,
      list: [], // 成语库
      covered: [], // 已使用
      chatList: [], // 聊天内容
      input: undefined,
      tip: ''
    };
  },
  components: {
    'user-list': UserList,
    'chat-battle-box': ChatBattleBox,
  },
  mounted() {
    this.list = utils.getData();
    this.socket = io()
    this.socket.on('users', (data) => { 
      this.users = data.users
      this.chatList.push(typeof data.msg === 'string' ? { type: 'info', msg: data.msg } : data.msg); 
    });
    this.socket.on('user', u => this.currentUser = u);
    this.socket.on('status', s => this.status = s)
    this.socket.on('turn', t =>  { 
      this.currentTurn = t
      this.tip = `等待${this.users[t].name}回答...`;
    })
    this.socket.on('msg', m => this.chatList.push(m))
    this.socket.on('input', d => {
      this.chatList.push(d);
    })
  },
  methods: {
    start() {
      this.socket.emit('start',this.currentUser.id)
    },
    send() {
      // check input valid
      this.socket.emit('input', this.input);
      this.input = undefined;
    },
    pass() {
      this.socket.emit('pass')
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
  .tip
    font-size 10px
    color grey
</style>
