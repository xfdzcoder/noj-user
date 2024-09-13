<template>
  <div>
    <el-button link @click="showResultList">查看全部执行结果</el-button>
    <div class="">
      <div v-if="currentExecuteResult?.succeed">
        成功
        <div class="time-memory">
          <div class="time">
            执行用时：{{ currentExecuteResult?.avgTime }} ms
          </div>
          <div class="memory">
            消耗内存：{{ formatBytes(currentExecuteResult?.avgMemory) }}
          </div>
        </div>
      </div>
      <div v-else>
        <div class="error-title">
          {{ currentExecuteResult?.exitType }}
        </div>
        <div class="error-content">
          {{ currentExecuteResult?.throwableOutput }}
        </div>
      </div>
    </div>

    <div class="code">
      <div class="code-title">
        代码 | {{ currentExecuteInfo?.languageType }}
      </div>
      <div class="code-content">
        <keep-alive>
          <pre v-d-code-highlight :data-lang="currentExecuteInfo?.languageType.toLowerCase()" v-html="currentExecuteInfo?.codeText"></pre>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getById } from '@/api/question/execute-result'
import { ElMessage } from 'element-plus'
import { formatBytes } from '@/utils/format'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'QuestionResultDetail'
})

const emits = defineEmits<{
  (e: 'changeLeft', componentName?: string): void,
  (e: 'changeRight', componentName?: string): void,
  (e: 'reset'): void
}>()

const questionStore = useQuestionStore()
const { currentExecuteResult, currentExecuteInfo } = storeToRefs(questionStore)

const showResultList = () => {
  emits('changeLeft', 'QuestionResult')
}


onMounted(() => {
  if (!currentExecuteResult.value) {
    // 不可能不存在
    ElMessage.warning('记录不存在')
    emits('reset')
    return
  }
  console.log('Detail Mounted')
  const succeed = currentExecuteResult.value.succeed
  if (succeed === undefined || succeed === null) {
    getById(currentExecuteResult.value.id)
      .then(res => {
        currentExecuteResult.value = res.data
      })
  }
})

</script>

<style scoped>

</style>
