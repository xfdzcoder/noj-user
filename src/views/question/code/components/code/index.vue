<template>
  <div class="container">
    <div class="header">
      <el-select v-model="languageType">
        <el-option value="java">Java</el-option>
      </el-select>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <div class="editor-box">
      <code-editor
        class="editor"
        v-model="code"
        :options="editorOptions"
      />
    </div>
    <div class="operate">
    </div>
  </div>
</template>

<script setup lang="ts">
import { CodeEditor } from 'vue-devui'
import { computed, ref } from 'vue'
import { check, execute } from '@/api/question/code'
import { ElMessage } from 'element-plus'
import type { CodeExecuteReq, ExecuteInfo } from '@/api/question'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'QuestionCodeEditor'
})
const emits = defineEmits<{
  (e: 'showResultDetail'): void
}>()

const questionStore = useQuestionStore()
const { currentExecuteInfo, currentExecuteResult, questionInfo } = storeToRefs(questionStore)

const editorOptions = computed(() => ({
  language: languageType.value
}))

let checkerAlive = false
const checkResult = (info: ExecuteInfo) => {
  checkerAlive = true
  const checker = setInterval(() => {
    check(info.id)
      .then(res => {
        emits('showResultDetail')
        currentExecuteInfo.value = info
        currentExecuteResult.value = res.data
        clearInterval(checker)
        checkerAlive = false
        ElMessage.success('执行结束')
      })
  }, 5000)
  setTimeout(() => {
    if (checkerAlive) {
      ElMessage.error('系统错误，执行失败')
      clearInterval(checker)
    }
  }, 30000)
}

const languageType = ref<string>('java')
const code = ref<string>(`import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println(a + b);
    }
}`)

const submit = () => {
  const data: CodeExecuteReq = {
    code: code.value,
    questionInfoId: questionInfo.value?.id as string,
    languageType: languageType.value
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .el-select,
.header .el-button {
  width: 30%;
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

</style>
