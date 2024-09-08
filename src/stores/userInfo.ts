import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginReq, RegisterReq, UserInfo } from '@/api/user'
import { doLogin, doRegister } from '@/api/user/auth'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore(
  'user',
  () => {

    const userInfo = ref<UserInfo>()
    const token = ref<string>()

    const login = (data: LoginReq) => {
      doLogin(data)
        .then(res => {
          token.value = res.data.token
          userInfo.value = res.data.userInfo
          ElMessage.success('登录成功')
          router.push({ path: '/' })
        })
    }

    const register = (data: RegisterReq) => {
      doRegister(data)
        .then(_ => {
          ElMessage.success('注册成功')
          router.push({ path: '/portal/login' })
        })
    }

    const isLogin = (): boolean => {
      return Boolean(token.value) && Boolean(userInfo.value)
    }

    return {
      userInfo,
      token,
      login,
      register,
      isLogin
    }
  },
  {
    persist: true
  }
)
