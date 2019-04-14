<template>
  <a-layout class="layout">
    <template v-if="isSideMenu()">
      <sider-menu
        mode="inline"
        :menuData="menuData"
        :theme="navTheme"
        :collapsed="collapsed"
        :collapsible="true"
      />
    </template>
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{
        paddingLeft: fixSiderbar ? `${sidebarOpened ? 256 : 80}px` : '0'
      }"
    >
      <global-header
        :mode="layoutMode"
        :menuData="menuData"
        :theme="navTheme"
        :collapsed="collapsed"
        @toggleCollapse="toggleCollapse"
      />
      <!--</div>-->

      <!-- layout content -->
      <a-layout-content
        :style="{
          margin: '24px 24px 0',
          height: '100%',
          paddingTop: fixedHeader ? '64px' : '0'
        }"
      >
        <slot></slot>
      </a-layout-content>
      <setting-drawer />
    </a-layout>
  </a-layout>
</template>

<script>
import SettingDrawer from '_c/setting/SettingDrawer';
import SiderMenu from '../menu/SiderMenu';
import GlobalHeader from './GlobalHeader';
import { mixin } from '@/utils/mixin';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'GlobalLayout',
  components: {
    SiderMenu,
    GlobalHeader,
    SettingDrawer
  },
  mixins: [mixin],
  data() {
    return {
      menuData: [],
      collapsed: false
    };
  },
  created() {
    this.menuData = this.mainMenu.find(item => item.path === '/').children;
    this.collapsed = !this.sidebarOpened;
  },
  watch: {
    sidebarOpened(val) {
      console.log('sidebarOpened', val);
      this.collapsed = !val;
    }
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.addRouters
    })
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    }
  }
};
</script>

<style lang="less"></style>
