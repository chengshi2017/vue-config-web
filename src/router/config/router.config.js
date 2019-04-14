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
    redirect: '/service/servicePage',
    children: [
      {
        path: '/service/servicePage',
        name: 'servicePage',
        component: () => import('@/pages/service/ServicePage'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          keepAlive: true,
          permission: ['SERVICE_CATALOG']
        }
      },
      // 我的工作
      {
        path: '/home',
        name: 'home',
        component: PageView,
        redirect: '/home/dashboard',
        meta: { title: '我的工作', icon: 'tag', permission: ['HOME'] },
        children: [
          // {
          //   path: '/home/dashboard',
          //   name: 'dashboard',
          //   component: () => import('@/pages/home/WorkPlace'),
          //   meta: { title: '工作台', permission: ['SYS_DASHBOARD'] }
          // },
          {
            path: '/home/task',
            name: 'task',
            component: () => import('@/pages/home/TaskIndex'),
            meta: { title: '我的待办', permission: ['SYS_TASK'] }
          },
          {
            path: '/home/complete',
            name: 'complete',
            component: () => import('@/pages/home/TaskComplete'),
            meta: { title: '我的已办', permission: ['SYS_COMPLETE'] }
          }
        ]
      },
      // 服务
      {
        path: '/service',
        name: 'service',
        component: RouterView,
        redirect: '/service/servicePage',
        meta: {
          title: '服务管理',
          icon: 'profile',
          permission: ['SERVICE_MANAGE']
        },
        children: [
          // {
          //   path: '/service/servicePage',
          //   name: 'servicePage',
          //   component: () => import('@/pages/service/ServicePage'),
          //   meta: {
          //     title: '服务目录',
          //     keepAlive: true,
          //     permission: ['SERVICE_CATALOG']
          //   }
          // },
          {
            path: '/service/serviceApplication',
            name: 'serviceApplication',
            hidden: true,
            component: () => import('@/pages/service/ServiceApplication'),
            meta: {
              title: '服务申请',
              permission: ['SERVICE_CATALOG']
            }
          },
          {
            path: '/service/MyApplication',
            name: 'application',
            component: () => import('@/pages/service/MyApplication'),
            meta: {
              title: '我的申请',
              keepAlive: true,
              permission: ['SERVICE_APPLICATION']
            }
          },
          {
            path: '/service/ServiceInfo',
            name: 'serviceInfo',
            hidden: true,
            component: () => import('@/pages/service/ServiceInfo'),
            meta: {
              title: '服务详情',
              permission: ['SERVICE_APPLICATION']
            }
          },
          {
            path: '/service/serviceReqList',
            name: 'serviceReqList',
            component: () => import('@/pages/service/ServiceReqList'),
            meta: {
              title: '申请列表',
              keepAlive: true,
              permission: ['SERVICE_REQ_LIST']
            }
          }
        ]
      },
      // 变更
      {
        path: '/change',
        name: 'change',
        component: RouterView,
        redirect: '/change/changeList',
        meta: {
          title: '变更管理',
          icon: 'credit-card',
          permission: ['MOD_MANAGE']
        },
        children: [
          {
            path: '/change/changeList',
            name: 'changeList',
            component: () => import('@/pages/modify/ModifyList'),
            meta: {
              title: '变更列表',
              keepAlive: true,
              permission: ['MOD_LIST']
            }
          },
          {
            path: '/change/addChange',
            name: 'addChange',
            hidden: true,
            component: () => import('@/pages/modify/CreateChange'),
            meta: { title: '新增变更', permission: ['MOD_LIST'] }
          },
          {
            path: '/change/changeInfo',
            name: 'changeInfo',
            hidden: true,
            component: () => import('@/pages/modify/ChangeInfo'),
            meta: { title: '变更详情', permission: ['MOD_LIST'] }
          }
        ]
      },
      // 发布
      {
        path: '/release',
        name: 'release',
        component: RouterView,
        redirect: '/release/releaseList',
        meta: {
          title: '发布管理',
          icon: 'appstore-o',
          permission: ['RELEASE_MANAGE']
        },
        children: [
          {
            path: '/release/releaseList',
            name: 'releaseList',
            component: () => import('@/pages/releaseMgmt/ReleasePage'),
            meta: {
              title: '发布列表',
              keepAlive: true,
              permission: ['RELEASE_LIST']
            }
          },
          {
            path: '/release/createRelease',
            name: 'createRelease',
            hidden: true,
            component: () => import('@/pages/releaseMgmt/AddPublish'),
            meta: { title: '新增发布', permission: ['RELEASE_LIST'] }
          },
          {
            path: '/release/releaseInfo',
            name: 'releaseInfo',
            hidden: true,
            component: () => import('@/pages/releaseMgmt/ReleaseInfo'),
            meta: { title: '发布详情', permission: ['RELEASE_LIST'] }
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
            component: () => import('@/pages/system/user/userIndex'),
            meta: { title: '用户管理', permission: ['SYS_USER'] }
          },
          {
            path: '/setting/roleSetting',
            name: 'roleSetting',
            component: () => import('@/pages/system/role/roleIndex'),
            meta: { title: '角色管理', permission: ['SYS_ROLE'] }
          },
          {
            path: '/setting/menuSetting',
            name: 'menuSetting',
            component: () => import('@/pages/system/priv/privIndex'),
            meta: { title: '菜单管理', permission: ['SYS_PRIV'] }
          },
          {
            path: '/setting/dictSetting',
            name: 'dictSetting',
            component: () => import('@/pages/system/dict/dictIndex'),
            meta: { title: '字典管理', permission: ['SYS_DICT'] }
          },
          {
            path: '/setting/typeSetting',
            name: 'typeSetting',
            component: () => import('@/pages/system/setting/changeTypeIndex'),
            meta: { title: '功能分类' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/service/servicePage',
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
    component: () => import('@/pages/login/Login')
  },
  {
    path: '/404',
    component: () => import('@/pages/exception/404')
  }
];
