<template>
  <div style="margin: -24px -36px 0">
    <page-header :title="title" :logo="logo" :avatar="avatar">
      <slot slot="content" name="headerContent" />
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ desc }}</p>
        <div class="link">
          <template v-for="(item, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon"></a-icon>
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra" /> <slot slot="action" name="action" />
    </page-header>
    <div class="content">
      <div :class="['page-header-index-wide']"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader';
export default {
  name: 'PageLayout',
  components: {
    PageHeader
  },
  props: ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage']
};
</script>

<style lang="less" scoped>
.content {
  margin: 24px 24px 0;

  .link {
    margin-top: 16px;

    &:not(:empty) {
      margin-bottom: 16px;
    }
    a {
      margin-right: 32px;
      height: 24px;
      line-height: 24px;
      display: inline-block;

      i {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
