import { mapState } from 'vuex';

const mixin = {
  computed: {
    ...mapState({
      sidebarOpened: state => state.app.sidebar,
      primaryColor: state => state.app.color,
      navTheme: state => state.app.theme,
      colorWeak: state => state.app.weak,
      layoutMode: state => state.app.layout,
      fixedHeader: state => state.app.fixedHeader,
      autoHideHeader: state => state.app.autoHideHeader,
      contentWidth: state => state.app.contentWidth,
      fixSiderbar: state => state.app.fixedSider,
      showDrawer: state => state.app.showDrawer,
      visible: state => state.app.settingDrawer
    })
  },
  methods: {
    isTopmenu() {
      return this.layoutMode === 'topmenu';
    },
    isSideMenu() {
      return !this.isTopmenu();
    }
  }
};

export { mixin };
