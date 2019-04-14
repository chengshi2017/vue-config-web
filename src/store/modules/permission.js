import { constantRouterMap, ansycRouterMap } from '@/router/config/router.config';

function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

function filterAsyncRouter(routerMap, roles) {
  return routerMap.filter(route => {
    if (hasPermission(roles.userPrivilegeCodes, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data;
        const accessedRouters = filterAsyncRouter(ansycRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  }
};

export default permission;
