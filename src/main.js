import Vue from 'vue';
import App from './App.vue';
import Storage from 'vue-ls';
import router from './router';
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'
import store from './store';
import Antd from 'ant-design-vue';
import config from './defaultSettings';
import IconFont from '_c/iconComponent';
import { removeLoadingAnimate } from '@/utils/util';

import {
  ACCESS_TOKEN,
  SIDEBAR_TYPE,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_COLOR_WEAK,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_DRAWER_BUTTON,
  DEFAULT_MULTIPLE_TABS
} from './store/mutation-types';

import './permission';
import './assets/css/common.less';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Storage, config.storageOptions);
Vue.use(IconFont);

new Vue({
  router,
  store,
  created() {
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN));
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true));
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor));
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme));
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak));
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout));
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader));
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader));
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth));
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixedSider));
    store.commit('TOGGLE_DRAWER', Vue.ls.get(DEFAULT_DRAWER_BUTTON, config.drawer));
    store.commit('OPEN_DRAWER_SETTING', true);
    store.commit('OPEN_MULTIPLE_TABS', Vue.ls.get(DEFAULT_MULTIPLE_TABS, config.multipleTabs));

    removeLoadingAnimate('preloadingWrapper');
  },
  render: h => h(App)
}).$mount('#app');
