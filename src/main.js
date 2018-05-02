// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import configStore from './common/storeConfig';
import router from './common/routeConfig';

Vue.config.productionTip = false;

Vue.use(Vuex);
configStore();

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
