import Vue from 'vue';
import {
  SIDEBAR_TYPE,
  DEFAULT_COLOR,
  DEFAULT_FIXED_HEADER,
  DEFAULT_THEME,
  DEFAULT_COLOR_WEAK,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_DRAWER_BUTTON,
  DEFAULT_MULTIPLE_TABS
} from '@/store/mutation-types';

const app = {
  state: {
    sidebar: true,
    color: null,
    theme: '',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSider: false,
    autoHideHeader: false,
    weak: false,
    showDrawer: false,
    settingDrawer: false,
    multipleTabs: false,
    useLanguage: 1
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type;
      Vue.ls.set(SIDEBAR_TYPE, type);
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color);
      state.color = color;
    },
    TOGGLE_THEME: (state, theme) => {
      Vue.ls.set(DEFAULT_THEME, theme);
      state.theme = theme;
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      Vue.ls.set(DEFAULT_LAYOUT_MODE, layout);
      state.layout = layout;
    },
    TOGGLE_WEAK: (state, checked) => {
      Vue.ls.set(DEFAULT_COLOR_WEAK, checked);
      state.weak = checked;
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show);
      state.autoHideHeader = show;
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER, fixed);
      state.fixedHeader = fixed;
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type);
      state.contentWidth = type;
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed);
      state.fixedSider = fixed;
    },
    TOGGLE_DRAWER: (state, checked) => {
      Vue.ls.set(DEFAULT_DRAWER_BUTTON, checked);
      state.showDrawer = checked;
    },
    OPEN_DRAWER_SETTING: (state, checked) => {
      state.settingDrawer = checked;
    },
    OPEN_MULTIPLE_TABS: (state, checked) => {
      Vue.ls.set(DEFAULT_MULTIPLE_TABS, checked);
      state.multipleTabs = checked;
    }
  },
  actions: {
    setSidebar({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type);
    },
    ToggleColor({ commit }, color) {
      commit('TOGGLE_COLOR', color);
    },
    ToggleTheme({ commit }, theme) {
      commit('TOGGLE_THEME', theme);
    },
    ToggleWeak({ commit }, checked) {
      commit('TOGGLE_WEAK', checked);
    },
    ToggleLayoutMode({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode);
    },
    ToggleFixedHeader({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false);
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader);
    },
    ToggleContentWidth({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type);
    },
    ToggleFixSiderbar({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar);
    },
    ToggleFixedHeaderHidden({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show);
    },
    ToggleDrawer({ commit }, checked) {
      commit('TOGGLE_DRAWER', checked);
    },
    openDrawerSetting({ commit }, checked) {
      commit('OPEN_DRAWER_SETTING', checked);
    },
    ToggleHandleTabs({ commit }, checked) {
      commit('OPEN_MULTIPLE_TABS', checked);
    }
  }
};

export default app;
