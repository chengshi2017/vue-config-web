import Message from 'ant-design-vue/es/message';
import * as types from './../mutation-types';
import {
  getServiceCatalog,
  getTwoDirectory,
  getThreeDirectory,
  getServiceInfo,
  displayOtherButton,
  getTaskByServiceId
} from '@/axios/admin/service';

const service = {
  state: {
    oneLevelCatalog: [],
    twoLevelCatalog: [],
    threeLevelCatalog: [],
    oneDirectory: {},
    twoDirectory: [],
    threeDirectory: [],
    serviceInfo: {},
    processing: false,
    taskInfo: {},
    twoLevelObject: {}
  },
  actions: {
    getServiceCatalog({ commit }) {
      return new Promise((resolve, reject) => {
        getServiceCatalog()
          .then(res => {
            if (res.code === '111111') {
              commit('ONE_LEVEL_CATALOG', res.object.one);
              commit('TWO_LEVEL_CATALOG', res.object.two);
              commit('THREE_LEVEL_CATALOG', res.object.three);
            } else {
              Message.error(res.message);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getTwoDirectory({ commit }, id) {
      return new Promise((resolve, reject) => {
        getTwoDirectory(id)
          .then(res => {
            if (res.code === '111111') {
              commit('ONE_DIRECTORY', res.object.own);
              commit('TWO_DIRECTORY', res.object.child);
            } else {
              Message.error(res.message);
            }
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    getThreeDirectory({ commit }, id) {
      return new Promise((resolve, reject) => {
        getThreeDirectory(id)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TWO_OBJECT', res.object.own);
              commit('THREE_DIRECTORY', res.object.child);
            } else {
              Message.error(res.message);
            }
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    getServiceInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getServiceInfo(id)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_SERVICE_INFO', res.object);
            } else {
              Message.error(res.message);
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    dashButton({ commit }, id) {
      return new Promise((resolve, reject) => {
        displayOtherButton(id)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_SERVICE_PROCESSING', res.object);
            } else {
              Message.error(res.message);
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    getTaskByServiceId({ commit }, id) {
      return new Promise((resolve, reject) => {
        getTaskByServiceId(id)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_SERVICE_TASK', res.object);
            } else {
              Message.error(res.message);
            }
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    }
  },
  mutations: {
    [types.ONE_LEVEL_CATALOG]: (state, data) => {
      state.oneLevelCatalog = data;
    },
    [types.TWO_LEVEL_CATALOG]: (state, data) => {
      state.twoLevelCatalog = data;
    },
    [types.THREE_LEVEL_CATALOG]: (state, data) => {
      state.threeLevelCatalog = data;
    },
    [types.ONE_DIRECTORY]: (state, data) => {
      state.oneDirectory = data;
    },
    [types.TWO_DIRECTORY]: (state, data) => {
      state.twoDirectory = data;
    },
    [types.THREE_DIRECTORY]: (state, data) => {
      state.threeDirectory = data;
    },
    [types.SET_SERVICE_INFO]: (state, data) => {
      state.serviceInfo = data;
    },
    [types.SET_SERVICE_PROCESSING]: (state, data) => {
      state.processing = data;
    },
    [types.SET_SERVICE_TASK]: (state, data) => {
      state.taskInfo = data;
    },
    [types.SET_TWO_OBJECT]: (state, data) => {
      state.twoLevelObject = data;
    }
  }
};

export default service;
