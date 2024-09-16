<template>
  <div class="container">
    <el-button link @click="showResultList"><&ensp;查看全部执行结果</el-button>
    <div class="">
      <div v-if="currentExecuteResult?.succeed" class="success-box">
        <div class="success-title">
          <div class="label">运行结果:&ensp;</div>
          <div class="content">运行成功</div>
        </div>
        <div class="time-memory">
          <div class="time">
            执行用时：{{ currentExecuteResult?.avgTime }} ms
          </div>
          <div class="memory">
            消耗内存：{{ formatBytes(currentExecuteResult?.avgMemory) }}
          </div>
        </div>
      </div>
      <div v-else class="error-box">
        <div class="error-title">
          <span class="label">运行结果: </span>
          <span class="content">
            {{ currentExecuteResult?.exitType }}
          </span>
        </div>
        <div v-if="currentExecuteResult?.input && currentExecuteResult?.input.trim()" class="input">
          <span class="label">输入参数: </span>
          <pre class="content">{{ currentExecuteResult?.input }}</pre>
        </div>
        <div v-if="currentExecuteResult?.output" class="output">
          <span class="label">输出结果</span>
          <pre class="content">{{ currentExecuteResult?.output }}</pre>
        </div>
        <div v-if="currentExecuteResult?.exceptOutput" class="except-output">
          <span class="label">期望输出</span>
          <pre class="content">{{ currentExecuteResult?.exceptOutput }}</pre>
        </div>
        <div v-if="currentExecuteResult?.throwableOutput" class="error-content">
          <span class="label">异常输出</span>
          <pre class="content">{{ currentExecuteResult?.throwableOutput }}</pre>
        </div>
      </div>
    </div>

    <div class="code">
      <div class="code-title">
        代码 | {{ currentExecuteInfo?.languageType }}
      </div>
      <div class="code-content" :key="refreshKey">
        <pre v-d-code-highlight :data-lang="currentExecuteInfo?.languageType.toLowerCase()"
             v-html="currentExecuteInfo?.codeText"></pre>
      </div>
    </div>
    <el-collapse v-if="currentExecuteResult?.assistant && currentExecuteResult.newCode" accordion @change="onCollapseClick">
      <el-collapse-item name="AI">
        <template #title>
          <span class="assistant-title">AI 改正</span>
        </template>
        <template #default>
          <div class="assistant-box">
            <div class="assistant-info">
              {{ currentExecuteResult?.assistant }}
            </div>
            <div class="new-code code-content" :key="refreshNewCodeKey">
            <pre v-d-code-highlight :data-lang="currentExecuteInfo?.languageType.toLowerCase()"
                 v-html="currentExecuteResult?.newCode"></pre>
            </div>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDetailById } from '@/api/question/execute-result'
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
const props = defineProps({
  fetch: {
    type: Boolean,
    default: false
  }
})

const refreshKey = ref<number>(-999999)
const refreshNewCodeKey = ref<number>(-999999)
const questionStore = useQuestionStore()
const { currentExecuteResult, currentExecuteInfo } = storeToRefs(questionStore)

const showResultList = () => {
  emits('changeLeft', 'QuestionResult')
}

const onCollapseClick = (val: 'AI' | '') => {
  console.log(val)
  if (val === 'AI') {
    refreshNewCodeKey.value++
  }
}


onMounted(() => {
  if (! currentExecuteResult.value) {
    // 不可能不存在
    ElMessage.warning('记录不存在')
    emits('reset')
    return
  }
  console.log('Detail Mounted')
  if (props.fetch) {
    getDetailById(currentExecuteResult.value.id)
      .then(res => {
        const detail = res.data
        currentExecuteResult.value = detail.result
        currentExecuteInfo.value = detail.info
        refreshKey.value++
      })
  }
})

</script>

<style scoped>
.container {
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.container > div {
  width: 98%;
}

.success-box, .assistant-title {
  font-size: 1.2rem;
}

.success-title {
  display: flex;
}

.success-title .content {
  font-size: 1.2rem;
  color: green;
  font-weight: bold;
}

.error-box {
  font-size: 1.2rem;
  font-family: "Microsoft YaHei UI", serif;
}

.error-title .content {
  color: red;
  font-weight: bold;
}

.input {
  display: flex;
  flex-direction: column;
}

.content {
  font-size: 0.9rem;
  font-family: "Microsoft YaHei UI", serif;
}

.input .content,
.output .content,
.except-output .content {
  display: flex;
  align-items: center;
  background-color: #f7f7f8;
  border-radius: 10px;
  padding: 5px;
}

.error-title .content {
  font-size: 1.2rem;
}

.error-content .content {
  border: 10px;
  background-color: #feefef;
  padding: 5px;
  word-break: break-all;
  color: red;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Courier New", monospace, serif;
  border-radius: 10px;
}

.code {
  border-top: 1px solid #77777c;
  margin-top: 20px;
}

.code-content {
  background-color: #f7f7f8;
  padding: 5px;
  border-radius: 10px;
}

.el-collapse {
  padding-bottom: 20px;
  box-sizing: border-box;
}

</style>
