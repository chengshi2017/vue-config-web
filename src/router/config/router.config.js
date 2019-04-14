import { MenuView, PageView, RouterView } from '_c/layout';

/*
  系统功能路由，动态加载
 */
export const ansycRouterMap = [
  {
    path: '/',
    name: 'index',
    component: MenuView,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      // 我的工作
      {
        path: '/home',
        name: 'home',
        component: PageView,
        redirect: '/home/dashboard',
        meta: { title: '仪表盘', icon: 'tag', permission: ['HOME'] },
        children: [
          {
            path: '/home/dashboard',
            name: 'task',
            component: () => import('@/views/home/DashboardIndex'),
            meta: { title: '分析页', permission: ['SYS_DASHBOARD'] }
          },
          {
            path: '/home/monitor',
            name: 'complete',
            component: () => import('@/views/home/MonitorIndex'),
            meta: { title: '监控页', permission: ['SYS_MONITOR'] }
          }
        ]
      },
      // 模型
      {
        path: '/model',
        name: 'model',
        component: RouterView,
        redirect: '/model/modelIndex',
        meta: {
          title: '模型管理',
          icon: 'profile',
          permission: ['SYS_MODEL']
        },
        children: [
          {
            path: '/model/modelIndex',
            name: 'modelIndex',
            component: () => import('@/views/model/modelIndex'),
            meta: {
              title: '模型',
              permission: ['MODEL']
            }
          },
          {
            path: '/model/topology',
            name: 'topology',
            component: () => import('@/views/model/topology'),
            meta: {
              title: '模型拓扑',
              keepAlive: true,
              permission: ['MODEL_TOPO']
            }
          },
          {
            path: '/model/modelInst',
            name: 'modelInst',
            component: () => import('@/views/model/modelInst'),
            meta: {
              title: '模型实例',
              permission: ['MODEL_INST']
            }
          }
        ]
      },
      // 系统设置
      {
        path: '/setting',
        name: 'setting',
        component: PageView,
        redirect: '/setting/userSetting',
        meta: {
          title: '系统管理',
          icon: 'setting',
          permission: ['SYS_MANAGE']
        },
        children: [
          {
            path: '/setting/userSetting',
            name: 'userSetting',
            component: () => import('@/views/system/userIndex'),
            meta: { title: '用户管理', permission: ['SYS_USER'] }
          },
          {
            path: '/setting/roleSetting',
            name: 'roleSetting',
            component: () => import('@/views/system/roleIndex'),
            meta: { title: '角色管理', permission: ['SYS_ROLE'] }
          },
          {
            path: '/setting/menuSetting',
            name: 'menuSetting',
            component: () => import('@/views/system/privIndex'),
            meta: { title: '菜单管理', permission: ['SYS_PRIV'] }
          },
          {
            path: '/setting/dictSetting',
            name: 'dictSetting',
            component: () => import('@/views/system/dictIndex'),
            meta: { title: '字典管理', permission: ['SYS_DICT'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    hidden: true
  }
];
/*
  基础路由
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/Login')
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  },
  {
    path: '/403',
    component: () => import('@/views/exception/403')
  },
  {
    path: '/500',
    component: () => import('@/views/exception/500')
  }
];
