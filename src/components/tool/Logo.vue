<template>
  <div class="logo">
    <router-link :to="{ path: '/home/task' }">
      <img src="@/assets/images/index/icon.png" alt="Logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: 'XXX系统'
    }
  }
};
</script>

<style></style>
