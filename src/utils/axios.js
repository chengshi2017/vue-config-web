import axios from 'axios';
import { Message } from 'ant-design-vue';
import { getHost } from '@/utils/common';
import router from '@/router';

const baseUrl = getHost('VUE_APP_BASE_API');

const service = axios.create({
  baseURL: baseUrl,
  timeout: process.env['AXIOS_TIMEOUT'],
  withCredentials: true
});

const queue = [];
// api 内置的中断ajax方法
const cancelToken = axios.CancelToken;
const requestUrl = config => {
  return `${config.url}_${config.method}`;
};

const removeQueue = config => {
  queue.forEach((item, index) => {
    if (item.requestUrl === requestUrl(config)) {
      item.cancel();
      queue.splice(index, 1);
    }
  });
};

service.interceptors.request.use(
  config => {
    // 中断重复请求
    removeQueue(config);
    config.cancelToken = new cancelToken(c => {
      queue.push({
        requestUrl: requestUrl(config),
        cancel: c
      });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // 请求完成后从队列中删除
    removeQueue(response.config);
    if (response.status === 200) {
      return response.data;
    }
  },
  error => {
    if (error.response.status === 401) {
      router.push({ name: 'login' });
    } else {
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default service;
