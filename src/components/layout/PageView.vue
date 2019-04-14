<template>
  <page-layout :desc="desc" :title="getTitle" :linkList="linkList">
    <div slot="extra" class="extraImg"><img :src="extraImage" /></div>
    <transition name="page-toggle"> <router-view ref="page" /> </transition>
  </page-layout>
</template>

<script>
import PageLayout from '../page/PageLayout';
export default {
  name: 'PageView',
  components: { PageLayout },
  data() {
    return {
      title: '',
      desc: '',
      linkList: [],
      extraImage: '',
      multiPage: true
    };
  },
  mounted() {
    this.getPageHeaderInfo();
  },
  computed: {
    getTitle() {
      return this.$route.meta.title;
    }
  },
  updated: function() {
    this.getPageHeaderInfo();
  },
  methods: {
    getPageHeaderInfo() {
      // eslint-disable-next-line
      this.title = this.$route.meta.title;
      // 因为套用了一层 route-view 所以要取 ref 对象下的子节点的第一个对象
      const content = this.$refs.content && this.$refs.content.$children[0];

      if (content) {
        this.description = content.description;
        this.linkList = content.linkList;
        this.extraImage = content.extraImage;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.extraImg {
  margin-top: -70px;
  text-align: center;
  width: 165px;
  img {
    width: 100%;
  }
}
</style>
