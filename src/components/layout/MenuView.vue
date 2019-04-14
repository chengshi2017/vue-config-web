<template>
  <global-layout>
    <context-menu
      :itemList="itemList"
      :visible.sync="menuVisible"
      @select="onMenuSelect"
    />
    <a-tabs
      v-if="multiPage"
      @contextmenu.native="e => onContextMenu(e)"
      :activeKey="activePage"
      style="margin-top: -15px; margin-bottom: 8px"
      :hideAdd="true"
      type="editable-card"
      @change="changePage"
      @edit="editPage"
    >
      <a-tab-pane :key="page.fullPath" v-for="page in pageList">
        <span slot="tab" :pageKey="page.fullPath">{{ page.meta.title }}</span>
      </a-tab-pane>
    </a-tabs>
    <transition name="page-transition">
      <keep-alive v-if="keepAlive"> <router-view /> </keep-alive>
      <router-view v-else />
    </transition>
  </global-layout>
</template>

<script>
import ContextMenu from '../menu/ContextMenu';
import GlobalLayout from '../page/GlobalLayout';
import { mixin } from '@/utils/mixin';
import { mapState } from 'vuex';

export default {
  name: 'MenuView',
  components: {
    GlobalLayout,
    ContextMenu
  },
  mixins: [mixin],
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive;
    },
    ...mapState({
      multiPage: state => state.app.multipleTabs
    })
  },
  data() {
    return {
      pageList: [],
      activePage: '',
      menuVisible: false,
      linkList: [],
      itemList: [
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'swap', text: '关闭其它' },
        { key: '4', icon: 'close', text: '全部关闭' }
      ]
    };
  },
  created() {
    this.pageList.push(this.$route);
    this.linkList.push(this.$route.fullPath);
    this.activePage = this.$route.fullPath;
  },
  watch: {
    $route: function(newRoute) {
      this.activePage = newRoute.fullPath;
      if (!this.multiPage) {
        this.linkList = [newRoute.fullPath];
        this.pageList = [newRoute];
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath);
        this.pageList.push(newRoute);
      }
    },
    activePage: function(key) {
      this.$router.push(key);
    },
    multiPage: function(newVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath];
        this.pageList = [this.$route];
      }
    }
  },
  methods: {
    changePage(key) {
      this.activePage = key;
    },
    editPage(key, action) {
      this[action](key);
    },
    remove(key) {
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页了，不能再关闭了');
        return false;
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key);
      let index = this.linkList.indexOf(key);
      this.linkList = this.linkList.filter(item => item !== key);
      index = index >= this.linkList.length ? this.linkList.length - 1 : index;
      this.activePage = this.linkList[index];
    },
    onContextMenu(e) {
      const pageKey = this.getPageKey(e.target);
      if (pageKey !== null) {
        e.preventDefault();
        this.menuVisible = true;
      }
    },

    getPageKey(target, depth) {
      depth = depth || 0;
      if (depth > 2) {
        return null;
      }
      let pageKey = target.getAttribute('pagekey');
      pageKey =
        pageKey ||
        (target.previousElementSibling
          ? target.previousElementSibling.getAttribute('pagekey')
          : null);
      return (
        pageKey ||
        (target.firstElementChild
          ? this.getPageKey(target.firstElementChild, ++depth)
          : null)
      );
    },

    onMenuSelect(key, target) {
      let pageKey = this.getPageKey(target);
      switch (key) {
      case '1':
        this.closeLeft(pageKey);
        break;
      case '2':
        this.closeRight(pageKey);
        break;
      case '3':
        this.closeOthers(pageKey);
        break;
      case '4':
        this.closeAll(pageKey);
        break;
      default:
        break;
      }
    },

    closeLeft(pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList = this.linkList.slice(index);
      this.pageList = this.pageList.slice(index);
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0];
      }
    },
    closeRight(pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList = this.linkList.slice(0, index + 1);
      this.pageList = this.pageList.slice(0, index + 1);
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[this.linkList.length - 1];
      }
    },
    closeOthers(pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList.slice(index, index + 1);
      this.pageList.slice(index, index + 1);
      this.activePage = this.linkList[0];
    },
    closeAll() {
      this.linkList = [];
      this.pageList = [];
      this.$router.push({ path: '/sys/home/dashboard' });
    }
  }
};
</script>

<style lang="less">
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
