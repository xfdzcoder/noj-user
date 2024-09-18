import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostInfoDetail } from '@/api/community'

export const usePostStore = defineStore(
  'post',
  () => {

    const postInfo = ref<PostInfoDetail>()


    return {
      postInfo
    }
  },
  {
    persist: true
  }
)
