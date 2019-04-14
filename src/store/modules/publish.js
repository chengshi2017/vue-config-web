import Message from 'ant-design-vue/es/message';
import * as types from '../mutation-types';
import { getTaskInfo, displayButton, displayOtherButton } from '@/axios/admin/publish';

const publish = {
  state: {
    taskInfo: {},
    publishButton: [],
    publishTab: [],
    processing: false
  },
  actions: {
    getTaskInfo({ commit }, query) {
      return new Promise((resolve, reject) => {
        getTaskInfo(query)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TASK_INFO', res.object);
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
    displayButton({ commit }, query) {
      return new Promise((resolve, reject) => {
        displayButton(query.publishId, query.taskId)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_PUBLISH_BUTTON', res.object.button);
              commit('SET_PUBLISH_TAB', res.object.tab);
            } else {
              Message.error(res.message);
            }
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getPublishButton({ commit }, query) {
      return new Promise((resolve, reject) => {
        displayOtherButton(query.publishId, query.taskId)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_PUBLISH_PROCESSING', res.object);
            } else {
              Message.error(res.message);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mutations: {
    [types.SET_TASK_INFO]: (state, data) => {
      state.taskInfo = data;
    },
    [types.SET_PUBLISH_BUTTON]: (state, data) => {
      state.publishButton = data;
    },
    [types.SET_PUBLISH_TAB]: (state, data) => {
      state.publishTab = data;
    },
    [types.SET_PUBLISH_PROCESSING]: (state, data) => {
      state.processing = data;
    }
  }
};

export default publish;
