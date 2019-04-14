import { getTaskTable, getTaskList, getTaskValue, dashButton, getChangeInfo } from '@/axios/admin/change';
import * as types from './../mutation-types';
import Message from 'ant-design-vue/es/message';

const change = {
  state: {
    taskTable: [],
    taskTablePageResult: {},
    taskList: [],
    taskListPageResult: {},
    taskValue: '',
    processing: false,
    taskProcess: {},
    changeInfo: {}
  },
  actions: {
    getChangeInfo({ commit }, changeId) {
      return new Promise((resolve, reject) => {
        getChangeInfo(changeId)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_CHANGE_INFO', res.object);
            } else {
              Message.error(res.message);
            }
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getTaskTable({ commit }, paramObj) {
      return new Promise((resolve, reject) => {
        getTaskTable(paramObj)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TASK_TABLE_PAGE', res.object);
              commit('GET_TASK_TABLE', res.object.rows);
            } else {
              Message.error('1111111');
            }
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getTaskList({ commit }, paramObj) {
      return new Promise((resolve, reject) => {
        getTaskList(paramObj)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TASK_LIST', res.object.rows);
              commit('SET_TASK_LIST_PAGE', res.object);
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
    getTaskRecord({ commit }, query) {
      return new Promise((resolve, reject) => {
        getTaskValue(query.changeId, query.taskId)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TASK_VALUE', res.object ? res.object.description : '');
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
    displayOtherButton({ commit }, query) {
      return new Promise((resolve, reject) => {
        dashButton(query.changeId, query.taskId)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_DASH_BUTTON', res.object);
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
    [types.SET_CHANGE_INFO]: (state, data) => {
      state.changeInfo = data;
    },
    [types.GET_TASK_TABLE]: (state, data) => {
      state.taskTable = data;
    },
    [types.SET_TASK_TABLE_PAGE]: (state, data) => {
      state.taskTablePageResult = data;
    },
    [types.SET_TASK_LIST]: (state, data) => {
      state.taskList = data;
    },
    [types.SET_TASK_LIST_PAGE]: (state, data) => {
      state.taskListPageResult = data;
    },
    [types.SET_TASK_VALUE]: (state, data) => {
      state.taskValue = data;
    },
    [types.SET_DASH_BUTTON]: (state, data) => {
      state.processing = data;
    }
  }
};

export default change;
