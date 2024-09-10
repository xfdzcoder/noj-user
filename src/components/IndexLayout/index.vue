<template>
  <div class="page">
    <div class="header">
      <TopHeader />
    </div>
    <hr>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopHeader from '@/views/index/components/TopHeader.vue'

defineOptions({
  name: 'IndexLayout'
})


</script>

<style scoped>
.page {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}
.header,
.main {
  margin: 2vh 20vw 0 20vw;
}
</style>
