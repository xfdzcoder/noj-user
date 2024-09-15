<template>
  <div>
    <el-table :data="results?.records"
              @row-click="onRowClick"

    >
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-icon v-if="scope.row.succeed" class="result-success"><Select /></el-icon>
          <el-icon v-else class="result-fail">
            <CloseBold />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="执行用时" align="center">
        <template #default="scope">
          {{ (scope.row.avgTime && scope.row.avgTime !== 0) ? scope.row.avgTime : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="消耗内存" align="center">
        <template #default="scope">
          {{ (scope.row.avgMemory && scope.row.avgMemory !== 0) ? formatBytes(scope.row.avgMemory) : '-' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import type { ExecuteResult, ExecuteResultCondition } from '@/api/question'
import { CloseBold, Select } from '@element-plus/icons-vue'
import { list } from '@/api/question/execute-result'
import type { Page } from '@/api/common'
import { formatBytes } from '@/utils/format'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'QuestionResult'
})
const emits = defineEmits<{
  (e: 'showResultDetail', direct: 'left' | 'right'): void
}>()

const questionStore = useQuestionStore()
const { currentExecuteResult } = storeToRefs(questionStore)

const results = ref<Page<ExecuteResult>>()

const onRowClick = (row: ExecuteResult, column: any, event: Event) => {
  currentExecuteResult.value = row
  emits('showResultDetail', 'right')
}

const init = () => {
  const condition: ExecuteResultCondition = {
    current: 1,
    size: 10
  }
  list(condition)
    .then(res => {
      results.value = res.data
    })
}

onMounted(() => {
  init()
})

defineExpose({
  init
})

</script>

<style scoped>
.result-fail {
  color: red;
}
.result-success {
  color: green;
}
</style>
