<template>
  <a-layout-sider
    :class="[
      'sider',
      'shadow',
      theme,
      fixSiderbar ? 'ant-fixed-sidemenu' : null
    ]"
    width="256px"
    :trigger="null"
    :collapsible="collapsible"
    v-model="collapsed"
  >
    <logo />
    <i-menu
      :theme="theme"
      :mode="mode"
      :menuList="menuData"
      :collapsed="collapsed"
      @select="onSelect"
      style="padding: 16px 0;"
    />
  </a-layout-sider>
</template>

<script>
import IMenu from './IMenu';
import Logo from '_c/tool/Logo';
import { mixin } from '@/utils/mixin';
export default {
  name: 'SiderMenu',
  mixins: [mixin],
  components: {
    IMenu,
    Logo
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    menuData: {
      type: Array,
      required: true
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data() {
    return {};
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    }
  }
};
</script>
