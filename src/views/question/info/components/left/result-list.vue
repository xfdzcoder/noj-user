<template>
  <div>
    <el-table :data="results"
              @row-click="onRowClick"
    >
      <el-table-column label="状态">
        <template #default="scope">
          <el-icon v-if="scope.row.succeed" class="result-success"><Select /></el-icon>
          <el-icon v-else class="result-fail"><CloseBold /></el-icon>
        </template>
      </el-table-column>
      <el-table-column label="执行用时" prop="avgTime" />
      <el-table-column label="消耗内存">
        <template #default="scope">
          {{ formatBytes(scope.row.avgMemory) }}
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
import type { Page } from '@/api/common';
import { formatBytes } from '@/utils/format'

defineOptions({
  name: 'QuestionResult'
})
const emits = defineEmits<{
  (e: 'changeRight', index: number): void
}>()

const results = ref<Page<ExecuteResult>>()

const onRowClick = (row: ExecuteResult, column: any, event: Event) => {
  emits('changeRight', 1)
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

</script>

<style scoped>

</style>
