import Menu from 'ant-design-vue/es/menu/index';
import Icon from 'ant-design-vue/es/icon/index';

const { Item, SubMenu } = Menu;
// 默认菜单图标数组，如果菜单没配置图标，则会设置从该数组随机取一个图标配置
// const iconArr = ['home', 'book', 'copy', 'credit-card', 'appstore-o', 'setting', 'bell', 'delete', 'code-o', 'poweroff', 'eye-o', 'hourglass'];
export default {
  name: 'IMenu',
  props: {
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    rootSubmenuKeys: vm => {
      let keys = [];
      vm.menuList.forEach(item => {
        keys.push(item.path);
      });
      return keys;
    }
  },
  created() {
    this.updateMenu();
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    $route: function() {
      this.updateMenu();
    }
  },
  methods: {
    renderIcon: function(h, icon, index) {
      return icon === 'none' || icon === undefined
        ? null
        : h(Icon, {
            props: { type: icon !== undefined ? icon : '' }
          });
    },
    renderMenuItem: function(h, menu, pIndex, index) {
      return h(
        Item,
        {
          key: menu.path ? menu.path : 'item_' + pIndex + '_' + index
        },
        [
          h('router-link', { attrs: { to: { name: menu.name } } }, [
            this.renderIcon(h, menu.meta.icon),
            h('span', [menu.meta.title])
          ])
        ]
      );
    },
    renderSubMenu: function(h, menu, pIndex, index) {
      let this2_ = this;
      let subItem = [h('span', { slot: 'title' }, [this.renderIcon(h, menu.meta.icon), h('span', [menu.meta.title])])];
      let itemArr = [];
      let pIndex_ = pIndex + '_' + index;
      menu.children.forEach(function(item, i) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i));
      });
      return h(SubMenu, { key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index }, subItem.concat(itemArr));
    },
    renderItem: function(h, menu, pIndex, index) {
      if (!menu.hidden) {
        return menu.children ? this.renderSubMenu(h, menu, pIndex, index) : this.renderMenuItem(h, menu, pIndex, index);
      }
    },
    renderMenu: function(h, menuTree) {
      let this2_ = this;
      let menuArr = [];
      menuTree.forEach(function(menu, i) {
        if (!menu.hidden) {
          menuArr.push(this2_.renderItem(h, menu, '0', i));
        }
      });
      return menuArr;
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu() {
      const routes = this.$route.matched.concat();
      if (routes.length >= 4 && this.$route.meta.hidden) {
        routes.pop();
        this.selectedKeys = [routes[2].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }
      const openKeys = [];
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path);
        });
      }
      this.collapsed || this.mode === 'horizontal' ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
    }
  },
  render(h) {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: obj => {
            this.selectedKeys = obj.selectedKeys;
            this.$emit('select', obj);
          }
        }
      },
      this.renderMenu(h, this.menuList)
    );
  }
};
