import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    app,
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
  strict: false, // 设置运行模式
  plugins: debug ? [createLogger()] : [] // 调试模式下加入日志
});
