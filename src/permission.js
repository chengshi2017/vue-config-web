import Vue from 'vue';
import Store from './store';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ACCESS_TOKEN } from './store/mutation-types';
import notification from 'ant-design-vue/es/notification';

NProgress.configure({ showSpinner: false });

const whiteList = ['login'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next({ path: '/service/servicePage' });
      NProgress.done();
    } else {
      if (Store.getters.userId === null) {
        Store.dispatch('getUserInfo')
          .then(res => {
            if (res.code === '111111') {
              const roles = res.object;
              if (roles.userPrivilegeCodes && roles.userPrivilegeCodes.length > 0) {
                Store.dispatch('GenerateRoutes', { roles }).then(() => {
                  // 根据roles权限生成可访问的路由表
                  // 动态添加可访问路由表
                  router.addRoutes(Store.getters.addRouters);
                  const redirect = decodeURIComponent(from.query.redirect || to.path);
                  if (redirect === to.path) {
                    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    next({ ...to, replace: true });
                  } else {
                    next({ path: redirect });
                  }
                });
              } else {
                notification.error({
                  message: '错误',
                  description: '当前用户无权限菜单，请联系系统管理员'
                });
                Store.dispatch('LogOut').then(() => {
                  next({ path: '/login', query: { redirect: to.fullPath } });
                  NProgress.done();
                });
              }
            } else {
              notification.error({
                message: '错误',
                description: '获取用户信息失败，请重试'
              });
              Store.dispatch('LogOut').then(() => {
                next({ path: '/login', query: { redirect: to.fullPath } });
                NProgress.done();
              });
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '获取用户信息失败，请重试'
            });
            Store.dispatch('LogOut').then(() => {
              next({ path: '/login', query: { redirect: to.fullPath } });
              NProgress.done();
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
