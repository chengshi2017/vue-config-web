import JSEncrypt from 'jsencrypt';
// import { Base64 } from 'js-base64';
import { getPublicKey } from '@/api/auth/login';
import { Message } from 'ant-design-vue';

export function getHost(type) {
  return window.apiHostSetting ? window.apiHostSetting[type] : process.env[type];
}

export function generateEncryptedLoginData(obj) {
  return new Promise((resolve, reject) => {
    // 从后台获取
    getPublicKey()
      .then(res => {
        if (res.code === '111111') {
          let publicKey = res.object;
          const encryptor = new JSEncrypt();
          encryptor.setPublicKey(publicKey);
          let encryptedObj = {};
          for (const name in obj) {
            if (name !== 'captcha') {
              // 只要不是captcha都加密
              encryptedObj[name] = encryptor.encrypt(obj[name]);
            } else {
              encryptedObj[name] = obj[name];
            }
          }
          resolve(encryptedObj);
        } else {
          Message.error(res.message);
        }
      })
      .catch(() => {
        Message.error('服务器连接异常，请确定网络是否畅通');
      });
  });
}
