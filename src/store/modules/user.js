import Vue from 'vue';
import { LoginByUserName, logout, getUserInfo } from '@/axios/auth/login';
import * as types from './../mutation-types';
import Message from 'ant-design-vue/es/message';

const user = {
  state: {
    userId: null,
    userName: null,
    token: null,
    userNameInitial: null
  },
  mutations: {
    [types.SET_USER_ID]: (state, userId) => {
      state.userId = userId;
    },
    [types.SET_TOKEN]: (state, token) => {
      Vue.ls.set(types.ACCESS_TOKEN, token, 30 * 60 * 1000);
      state.token = token;
    },
    [types.SET_USER_NAME]: (state, userName) => {
      state.userName = userName;
    },
    [types.SET_USER_AVATAR]: (state, data) => {
      state.userNameInitial = data;
    }
  },
  actions: {
    LoginByUserName({ commit }, userLoginByName) {
      return new Promise((resolve, reject) => {
        LoginByUserName(userLoginByName)
          .then(res => {
            if (res.code === '111111') {
              commit('SET_TOKEN', res.token);
            }
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            if (res.code === '111111') {
              commit('SET_USER_ID', res.object.userId);
              commit('SET_USER_NAME', res.object.userName);
              commit('SET_USER_AVATAR', res.object.userNameInitial);
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
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', null);
        commit('SET_USER_ID', null);
        commit('SET_USER_NAME', null);
        Vue.ls.remove(types.ACCESS_TOKEN);
        logout()
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
