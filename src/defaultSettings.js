/**
 * 项目默认配置项
 * primaryColor --系统默认主题色
 * navTheme --系统菜单样式，目前支持【'dark', 'light'】两种模式
 * colorWeak --色弱模式
 * layout --整体布局方式 【'sidemenu','topmenu'】两种布局
 * fixedHeader --固定Header boolean
 * fixedSider --固定Sider boolean
 * 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 * drawer -- 抽屉按钮 boolean
 * multipleTabs --多页签模式 boolean
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 */
export default {
  primaryColor: '#1890FF',
  navTheme: 'dark',
  layout: 'sidemenu',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixedSider: false,
  autoHideHeader: false,
  colorWeak: false,
  drawer: false,
  multipleTabs: false,
  lang: 1,
  // vue -ls options
  storageOptions: {
    namespace: 'ITSM_', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
};
