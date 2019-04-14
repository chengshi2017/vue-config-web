<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    :visible="clicked"
    @visibleChange="handleClickChange"
  >
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane tab="我的待办">
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-badge count="0">
        <a-icon style="font-size: 16px; padding: 4px" type="bell"></a-icon>
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderNotice',
  components: {},
  data() {
    return {
      loading: false,
      clicked: false
    };
  },
  methods: {
    handleClickChange(visible) {
      this.clicked = visible;
    },
    fetchNotice() {
      if (this.loading) {
        this.loading = false;
        return
      }
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  }
};
</script>

<style lang="less">
.title {
  font-weight: normal;
  margin-bottom: 8px;
}
.tag .extra {
  font-weight: normal;
  margin: -1.5px 0 8px 40%;
}
.ant-list-item-content {
  flex: none;
}
.content .text {
  clear: both;
  margin-left: 10px;
  color: #2db7f5;
}
.content .tag {
  margin-right: 15px;
  float: right;
}
.list .ant-list-item-meta .ant-list-item-meta-content {
  min-width: 200px;
}
</style>
