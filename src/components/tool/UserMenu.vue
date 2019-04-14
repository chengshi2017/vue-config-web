<template>
  <div class="user-wrapper">
    <header-notice class="action" />
    <span class="action">
      <a-icon type="skin" @click="openDrawerSetting"></a-icon>
    </span>
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar
          class="avatar"
          style="color: #f56a00; backgroundColor: #fde3cf"
        >{{userAvatar}}</a-avatar>
        <span>{{ nickname }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!--<a-dropdown>-->
    <!--<span class="action">-->
    <!--<a-icon type="global" :style="{fontSize: '1.3rem'}"></a-icon>-->
    <!--</span>-->
    <!--<a-menu slot="overlay" class="user-dropdown-menu-wrapper"  @click="changLang" :selectedKeys="['2']">-->
    <!--<a-menu-item key="1">-->
    <!--<a href="javascript:;">-->
    <!--<icon-font type="icon-cn-copy" />-->
    <!--<span>简体中文</span>-->
    <!--</a>-->
    <!--</a-menu-item>-->
    <!--<a-menu-item key="2">-->
    <!--<a href="javascript:;">-->
    <!--<icon-font type="icon-en-copy"/>-->
    <!--<span>English</span>-->
    <!--</a>-->
    <!--</a-menu-item>-->
    <!--</a-menu>-->
    <!--</a-dropdown>-->
  </div>
</template>

<script>
import HeaderNotice from '../page/HeaderNotice';
import { mapState } from 'vuex';

export default {
  name: 'UserMenu',
  components: {
    HeaderNotice
  },
  created() {},
  computed: {
    ...mapState({
      nickname: state => state.user.userName,
      userAvatar: state => state.user.userNameInitial,
    })
  },
  methods: {
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '退出系统后将不能继续操作，是否继续？',
        okText: '确定',
        cancelText: '取消',
        centered: true,
        iconType: 'question-circle',
        onOk: () => {
          this.$store.dispatch('LogOut').then(res => {
            if (res.code === '111111') {
              window.location.reload();
            } else {
              this.$message.error(res.message);
            }
          });
        },
        onCancel: () => {
          this.$message.warning('已取消退出系统');
        }
      });
    },
    openDrawerSetting() {
      this.$store.dispatch('openDrawerSetting', true);
    }
  }
};
</script>

<style></style>
