<template>
  <div class="container">
    <div class="left">
      NOJ | 首页
    </div>
    <div class="right">
      <el-dropdown
        type="text"
        placement="bottom"
        trigger="click"
        @command="onCommand"
      >
        <template #default>
          <el-avatar shape="circle" :src="userInfo?.avatar ?? DefaultAvatar" />
        </template>
        <template #dropdown>
          <el-dropdown-item :command="CommandEnum.PersonalCenter">
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item :command="CommandEnum.Logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import DefaultAvatar from '@/assets/default-avatar.png'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'TopHeader'
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const router = useRouter()

enum CommandEnum {
  PersonalCenter,
  Logout
}

const onCommand = (command: CommandEnum) => {
  switch (command) {
    case CommandEnum.PersonalCenter:
      router.push({
        path: '/user/dashboard'
      })
      break
    case CommandEnum.Logout:


      break
  }
}

</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
