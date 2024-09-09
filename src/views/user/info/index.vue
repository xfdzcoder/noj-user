<template>
  <div class="container">
    <h3>个人资料</h3>
    <el-form :model="form">
      <el-form-item label="头像">
        <el-upload
          action=""
          :show-file-list="false"
          :http-request="onUploadAvatar"
        >
          <el-avatar size="large" shape="circle" :src="form.avatar ?? DefaultAvatar" />
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input type="text" v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input type="text" v-model="form.email" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type UploadRequestHandler, type UploadRequestOptions } from 'element-plus'
import type { UserInfo } from '@/api/user'
import { useUserStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import DefaultAvatar from '@/assets/default-avatar.png'
import { upload } from '@/api/user/info'

defineOptions({
  name: 'UserInfo'
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const form = ref<UserInfo>(userInfo.value as UserInfo)


const onUploadAvatar: UploadRequestHandler = async (options: UploadRequestOptions) => {
  console.log('upload avatar rawFile: ', options)
  if (options.file.type !== 'image/png') {
    ElMessage.error('Avatar picture must be PNG format!')
    return Promise.reject()
  }
  upload(options.file)
    .then(res => {
      console.log(res)
    })

  return Promise.reject()
}

</script>

<style scoped>

</style>
