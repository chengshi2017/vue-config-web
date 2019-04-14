import axios from '@/utils/axios';

export function getPublicKey() {
  return axios({
    url: '/api/auth/publicKey',
    method: 'get'
  });
}

export function LoginByUserName(userLoginObj) {
  return axios({
    url: '/api/auth/login',
    method: 'post',
    data: userLoginObj
  });
}

export function getUserInfo() {
  return axios({
    url: '/api/util/getCurrentUser',
    method: 'get'
  });
}

export function logout() {
  return axios({
    url: '/api/auth/logOut',
    method: 'get'
  });
}
