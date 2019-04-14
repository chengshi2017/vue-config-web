<template>
  <a-layout-header
    v-if="!headerBarFixed"
    :class="[fixedHeader && 'ant-header-fixedHeader', 'ant-header-side-opened']"
    :style="{ padding: '0' }"
  >
    <div v-if="mode === 'sidemenu'" class="header">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      >
      </a-icon>
      <user-menu />
    </div>
    <div v-else :class="['top-nav-header-index', theme]">
      <div class="header-index-wide">
        <div class="header-index-left">
          <logo class="top-nav-header" />
          <i-menu mode="horizontal" :menuList="menuData" :theme="theme" />
        </div>
        <user-menu class="header-index-right" />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import IMenu from '_c/menu/IMenu';
import UserMenu from '_c/tool/UserMenu';
import Logo from '_c/tool/Logo';

import { mixin } from '@/utils/mixin';

export default {
  name: 'GlobalHeader',
  components: {
    IMenu,
    UserMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      headerBarFixed: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.autoHideHeader) {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 100) {
          this.headerBarFixed = true;
        } else {
          this.headerBarFixed = false;
        }
      } else {
        this.headerBarFixed = false;
      }
    },
    toggleCollapse() {
      this.$emit('toggleCollapse');
    }
  }
};
</script>
