<template>
  <div class="page-header">
    <div class="page-header-index-wide">
      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          <router-link v-if="item.name !== name" :to="{ path: item.path }">
            {{ item.meta.title }}
          </router-link>
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>

      <div class="detail">
        <div class="main">
          <div class="row">
            <img v-if="logo" :src="logo" class="logo" />
            <h1 v-if="title" class="title">{{ title }}</h1>
            <div v-if="this.$slots.extra" class="extra">
              <!--<div class="extra-content">-->
              <slot name="extra" />
            </div>
            <!--<div class="action">-->
            <!--<slot name="action"></slot>-->
            <!--</div>-->
          </div>
          <div class="row">
            <div v-if="avatar" class="avatar"><a-avatar :src="avatar" /></div>
            <div v-if="this.$slots.content" class="headerContent">
              <slot name="content"></slot>
            </div>
            <!--<div v-if="this.$slots.extra" class="extra">-->
            <!--&lt;!&ndash;<div class="extra-content">&ndash;&gt;-->
            <!--<slot name="extra"/>-->
            <!--</div>-->
            <div v-if="this.$slots.action" class="action">
              <slot name="action" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  components: {},
  props: {
    avatar: {
      type: String,
      required: false
    },
    logo: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      breadList: [],
      name: ''
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadList = [];
      this.name = this.$route.name;
      this.$route.matched.forEach(item => {
        this.breadList.push(item);
      })
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;

  .breadcrumb {
    margin-bottom: 16px;
  }

  .detail {
    display: flex;
    /*margin-bottom: 16px;*/

    .avatar {
      flex: 0 1 72px;
      margin: 0 24px 8px 0;

      & > span {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
      }
    }

    .main {
      width: 100%;
      flex: 0 1 auto;

      .row {
        display: flex;
        width: 100%;

        .avatar {
          margin-bottom: 16px;
        }
      }

      .title {
        font-size: 20px;
        font-weight: 500;

        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
        flex: auto;
      }
      .logo {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        margin-right: 16px;
      }
      .content,
      .headerContent {
        flex: auto;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 32px;
          }
        }
      }
      .extra {
        flex: 0 1 auto;
        margin-left: 88px;
        min-width: 242px;
        text-align: right;
      }
      .action {
        margin-left: 56px;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: right;
        position: relative;
        &:empty {
          display: none;
        }
      }
    }
  }
}
</style>
