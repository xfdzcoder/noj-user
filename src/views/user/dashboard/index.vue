<template>
  <div class="container">
    <div class="info-card">
      <el-button link @click="toDetailInfo">修改个人资料</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'UserDashboard'
})

const router = useRouter()

const toDetailInfo = () => {
  router.push({
    path: '/user/info'
  })
}
</script>

<style scoped>

</style>
