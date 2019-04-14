<template>
  <div class="setting-drawer" ref="settingDrawer">
    <a-drawer
      width="300px"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
      :getContainer="() => $refs.settingDrawer"
    >
      <div class="setting-drawer-index-content">
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div
                class="setting-drawer-index-item"
                @click="handleMenuTheme('dark')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                  alt="dark"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="navTheme === 'dark'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div
                class="setting-drawer-index-item"
                @click="handleMenuTheme('light')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                  alt="light"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="navTheme !== 'dark'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div class="setting-drawer-index-content">
          <div :style="{ marginBottom: '24px' }">
            <h3 class="setting-drawer-index-title">主题色</h3>
            <div style="height: 20px; margin-right: -20px">
              <a-tooltip
                class="setting-drawer-theme-color-colorBlock"
                v-for="(item, index) in colorList"
                :key="index"
              >
                <template slot="title">
                  {{ item.key }}
                </template>
                <a-tag :color="item.color" @click="changeColor(item.color)">
                  <a-icon
                    type="check"
                    v-if="item.color === primaryColor"
                  ></a-icon>
                </a-tag>
              </a-tooltip>
            </div>
          </div>
        </div>

        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                侧边栏导航
              </template>
              <div
                class="setting-drawer-index-item"
                @click="handleLayout('sidemenu')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
                  alt="sidemenu"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="layoutMode === 'sidemenu'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                顶部栏导航
              </template>
              <div
                class="setting-drawer-index-item"
                @click="handleLayout('topmenu')"
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
                  alt="topmenu"
                />
                <div
                  class="setting-drawer-index-selectIcon"
                  v-if="layoutMode !== 'sidemenu'"
                >
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <!--<template slot='title'>-->
                  <!--该设定仅 [顶部栏导航] 时有效-->
                  <!--</template>-->
                  <a-select
                    size="small"
                    style="width: 80px;"
                    :value="contentWidth"
                    @change="handleContentWidthChange"
                  >
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option
                      value="Fluid"
                      v-if="layoutMode !== 'sidemenu'"
                    >流式</a-select-option
                    >
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :defaultChecked="fixedHeader"
                  @change="handleFixedHeader"
                ></a-switch>
                <a-list-item-meta>
                  <div slot="title">固定 Header</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="!fixedHeader"
                  :defaultChecked="autoHideHeader"
                  @change="handleFixedHeaderHidden"
                ></a-switch>
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{
                      textDecoration: !fixedHeader ? 'line-through' : 'unset'
                    }"
                  >
                    下滑时隐藏 Header
                  </div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="layoutMode === 'topmenu'"
                  :checked="fixSiderbar"
                  @change="handleFixSiderbar"
                ></a-switch>
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{
                      textDecoration:
                        layoutMode === 'topmenu' ? 'line-through' : 'unset'
                    }"
                  >
                    固定侧边菜单
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <a-list :split="false">
            <a-list-item>
              <a-switch
                slot="actions"
                size="small"
                :defaultChecked="colorWeak"
                @change="onColorWeak"
              ></a-switch>
              <a-list-item-meta>
                <div slot="title">色弱模式</div>
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-switch
                slot="actions"
                size="small"
                :checked="showDrawer"
                @change="onHandleDrawer"
              ></a-switch>
              <a-list-item-meta>
                <div slot="title">显示抽屉按钮</div>
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-switch
                slot="actions"
                size="small"
                :checked="multiPage"
                @change="onHandleTabs"
              ></a-switch>
              <a-list-item-meta>
                <div slot="title">开启多页签模式</div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div
        v-if="showDrawer"
        class="setting-drawer-index-handle"
        @click="toggle"
      >
        <a-icon type="setting" v-if="!visible"></a-icon>
        <a-icon type="close" v-else></a-icon>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { colorList, updateTheme, updateColorWeak } from '_c/tool/setting';
import { mixin } from '@/utils/mixin';
import config from '@/defaultSettings';
import { mapState } from 'vuex';

export default {
  name: 'Setting',
  components: {},
  mixins: [mixin],
  data() {
    return {
      colorList
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('openDrawerSetting', false);
    }, 16);
    if (this.primaryColor !== config.primaryColor) {
      updateTheme(this.primaryColor);
    }
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak);
    }
  },
  computed: {
    ...mapState({
      multiPage: state => state.app.multipleTabs
    })
  },
  methods: {
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color);
        updateTheme(color);
      }
    },
    handleMenuTheme(theme) {
      this.$store.dispatch('ToggleTheme', theme);
    },
    handleLayout(mode) {
      this.$store.dispatch('ToggleLayoutMode', mode);
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      this.handleFixSiderbar(false);
      this.handleContentWidthChange('Fixed');
    },
    handleFixedHeader(fixed) {
      this.$store.dispatch('ToggleFixedHeader', fixed);
    },
    handleContentWidthChange(type) {
      this.$store.dispatch('ToggleContentWidth', type);
    },
    handleFixSiderbar(fixed) {
      if (this.layoutMode === 'topMenu') {
        this.$store.dispatch('ToggleFixSiderbar', false);
        return
      }
      this.$store.dispatch('ToggleFixSiderbar', fixed);
    },
    handleFixedHeaderHidden(autoHidden) {
      this.$store.dispatch('ToggleFixedHeaderHidden', autoHidden);
    },
    onColorWeak(checked) {
      this.$store.dispatch('ToggleWeak', checked);
      updateColorWeak(checked);
    },
    onHandleDrawer(checked) {
      this.$store.dispatch('ToggleDrawer', checked);
    },
    onHandleTabs(checked) {
      this.$store.dispatch('ToggleHandleTabs', checked);
    },
    onClose() {
      this.$store.dispatch('openDrawerSetting', false);
    },
    toggle() {
      let checked = !this.visible;
      this.$store.dispatch('openDrawerSetting', checked);
    }
  }
};
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
}

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 42px;
  height: 42px;
  right: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
.switch {
  text-align: right;
}
</style>
