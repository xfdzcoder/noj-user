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
  width: 99vw;
/*  position: absolute;
  top: 0;
  left: 0;*/
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.header,
.main {
  margin: 0 20vw 0 20vw;
}
.header {
  height: 4vh;
}
.main {
  height: 90vh;
}
</style>
