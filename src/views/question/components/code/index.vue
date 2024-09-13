<template>
  <div class="container">
    <el-select v-model="currentExecuteInfo.languageType">
      <el-option value="java">Java</el-option>
    </el-select>
    <div class="editor-box">
      <code-editor
        class="editor"
        v-model="currentExecuteInfo.codeText"
        :options="editorOptions"
      />
    </div>
    <div class="operate">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CodeEditor } from 'vue-devui'
import { computed } from 'vue'
import { check, execute } from '@/api/question/code'
import { ElMessage } from 'element-plus'
import type { CodeExecuteReq, ExecuteInfo } from '@/api/question'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'QuestionCode'
})
const emits = defineEmits<{
  (e: 'showResultDetail'): void
}>()

const questionStore = useQuestionStore()
const { currentExecuteInfo, currentExecuteResult, questionInfo } = storeToRefs(questionStore)

const editorOptions = computed(() => ({
  language: currentExecuteInfo.value.languageType
}))

const checkResult = (info: ExecuteInfo) => {
  const checker = setInterval(() => {
    check(info.id)
      .then(res => {
        emits('showResultDetail')
        currentExecuteResult.value = res.data
        clearInterval(checker)
        ElMessage.success('执行结束')
      })
  }, 5000)
  setTimeout(() => {
    ElMessage.error('系统错误，执行失败')
    clearInterval(checker)
  }, 30000)
}
const submit = () => {
  const data: CodeExecuteReq = {
    code: currentExecuteInfo.value.codeText,
    questionInfoId: questionInfo.value?.id as string,
    languageType: currentExecuteInfo.value.languageType
  }
  execute(data)
    .then(res => {
      checkResult(res.data)
      ElMessage.success('提交成功')
    })
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.editor-box {
  height: 90%;
  width: 100%;
  margin-top: 20px;
}
.editor {
  height: 100%;
  width: 100%;
}

.operate {
  position: fixed;
  bottom: 5vh;
  right: 19vw;
}
</style>
