<template>
  <div>
    <h1>Detail</h1>
    <div class="">
      <div v-if="executeDetail?.result.succeed">
        成功
        <div class="time-memory">
          <div class="time">
            执行用时：{{ executeDetail?.result.avgTime }} ms
          </div>
          <div class="memory">
            消耗内存：{{ formatBytes(executeDetail?.result.avgMemory) }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="error-title">
          {{ executeDetail?.result.exitType }}
        </div>
        <div class="error-content">
          {{ executeDetail?.result.throwableOutput }}
        </div>
      </div>
    </div>

    <div class="code">
      <div class="code-title">
        代码 | {{ executeDetail?.info.languageType }}
      </div>
      <div class="code-content">
        <pre v-d-code-highlight :data-lang="executeDetail?.info.languageType.toLowerCase()" v-html="executeDetail?.info.codeText"></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getById } from '@/api/question/execute-result'
import { ElMessage } from 'element-plus'
import type { ExecuteDetail } from '@/api/question'
import { formatBytes } from '@/utils/format'

defineOptions({
  name: 'QuestionResultDetail'
})

const router = useRouter()
const route = useRoute()
const executeDetail = ref<ExecuteDetail>()

onMounted(() => {
  const resultId = route.params.resultId
  if (! resultId) {
    // 不可能不存在
    ElMessage.warning('记录不存在')
    router.replace({
      path: '/question/result'
    })
    return
  }
  getById(resultId as string)
    .then(res => {
      executeDetail.value = res.data
    })
})

</script>

<style scoped>

</style>
