<template>
  <div class="page">
    <div v-if="mode === 'login'" class="login-box">
      <h2 class="title">NOJ | 登录</h2>
      <el-form :model="loginForm">
        <el-form-item label="邮箱：">
          <el-input type="text" v-model="loginForm.email" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="onLogin">登录</el-button>
          <el-button link @click="mode = 'register'">没有账号？点击注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="mode === 'register'" class="register-box">
      <h2 class="title">NOJ | 注册</h2>
      <el-form :model="registerForm" label-width="auto">
        <el-form-item label="昵称：">
          <el-input type="text" v-model="registerForm.nickname" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input type="text" v-model="registerForm.email" />
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input type="number" v-model="registerForm.captcha">
            <template #append>
              <el-button class="captcha-btn" type="info" @click="onCaptcha" :disabled="captcha.disabled">{{
                  captcha.text
                                                                                                         }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="registerForm.password" />
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input type="password" v-model="registerForm.confirmPassword" />
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="onRegister">注册</el-button>
          <el-button link @click="mode = 'login'">已有账号？点击登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { LoginReq, RegisterReq } from '@/api/user'
import { fetchCaptcha } from '@/api/user/auth'
import { setIntervalImmediately } from '@/utils/time'
import { useUserStore } from '@/stores/userInfo'

defineOptions({
  name: 'PortalLogin'
})

let userStore = useUserStore()
const { register, login } = userStore
const mode = ref<'login' | 'register'>('register')
const loginForm = ref<LoginReq>({
  email: '',
  password: ''
})

const onLogin = () => {
  // TODO 2024/9/8 14:26 on dev-xfdzcoder: 登录实现
  login(loginForm.value)
}

const registerForm = ref<RegisterReq>({
  nickname: '',
  email: '1507410636@qq.com',
  captcha: '',
  password: '',
  confirmPassword: ''
})
const onRegister = () => {
  register(registerForm.value)
}

const captcha = ref({
  text: '获取验证码',
  timeout: 10,
  disabled: false,
  reset() {
    captcha.value.disabled = false
    captcha.value.text = '获取验证码'
    captcha.value.timeout = 10
  }
})
const onCaptcha = () => {
  captcha.value.disabled = true
  const timer = setIntervalImmediately(() => {
    captcha.value.text = `${ --captcha.value.timeout } s`
    if (captcha.value.timeout <= 0) {
      captcha.value.reset()
      timer && clearInterval(timer)
    }
  }, 1000)
  fetchCaptcha(registerForm.value.email)
    .then(res => {
      // TODO 2024/9/8 19:26 on dev-xfdzcoder: 测试使用，记得删除
      registerForm.value.captcha = res.data
      ElMessage.success('发送成功，请查看您的邮件')
    })
}

</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.login-box {
  height: 20vh;
  width: 25vw;
  border: 1px solid black;
}

.title {
  text-align: center;
  margin: 0 0 20px 0;
}

:deep(.el-form-item:has(.form-btn) .el-form-item__content) {
  justify-content: flex-end;
}

.form-btn {
  width: 8vw;
}

.captcha-btn {
  width: 100px;
}
</style>
