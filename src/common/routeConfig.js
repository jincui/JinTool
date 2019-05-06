import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/feature/Home';
import Chengyu from '@/feature/chengyu/IndexPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/chengyu',
      component: Chengyu,
    },
  ],
});
