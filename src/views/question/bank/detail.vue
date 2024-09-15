<template>
  <div class="container">
    <div class="bank-info">
      <div class="title">
        {{ questionBank?.name }}
      </div>
      <div class="description">
        <MdPreview :content="questionBank?.description" />
      </div>
      <div class="info-line">
        <div class="info-item">
          <div class="info-label">
            题目数量：
          </div>
          <div class="info-content">
            {{ questionBank?.questionCount }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">
            好评数量：
          </div>
          <div class="info-content">
            {{ questionBank?.goodCount }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">
            评论数量：
          </div>
          <div class="info-content">
            {{ questionBank?.commentCount }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">
            学习人数：
          </div>
          <div class="info-content">
            {{ questionBank?.studyCount }}
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="question-info-list">
      <div class="question-info-table"
           v-for="[groupName, list] in questionInfoMap"
      >
        <div class="group-title">
          {{ groupName }}
        </div>
        <el-table :data="list" @row-click="onInfoClick">
          <el-table-column label="序号" prop="sort" />
          <el-table-column label="标题" prop="title" />
          <el-table-column label="题目类型">
            <template #default="scope">
              {{ resolveQuestionType(scope.row.questionType) }}
            </template>
          </el-table-column>
          <el-table-column label="难度">
            <template #default="scope">
              <el-tag :type="resolveDifficultyTagType(scope.row.difficulty)">
                {{ resolveDifficulty(scope.row.difficulty) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="通过率">
            <template #default="scope">
              {{ (scope.row.passCount * 100.0 / scope.row.submitCount).toFixed(2) }} %
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getById } from '@/api/question/bank'
import type { QuestionBank, QuestionInfo, QuestionInfoCondition } from '@/api/question'
import MdPreview from '@/components/MdPreview/index.vue'
import { useQuestionStore } from '@/stores/question'
import { listByBankId } from '@/api/question/info'

defineOptions({
  name: 'QuestionBankDetail'
})

const router = useRouter()
const route = useRoute()


const questionInfoMap = ref<Map<string, QuestionInfo[]>>(new Map())
const questionStore = useQuestionStore()
const { resolveQuestionType, resolveDifficulty, resolveDifficultyTagType, isCodeQuestion } = questionStore

const onInfoClick = (row: QuestionInfo) => {
  if (isCodeQuestion(row.questionType)) {
    router.push({
      path: `/question/code/${row.id}`
    })
    return
  }
}

const questionBank = ref<QuestionBank>()

onMounted(() => {
  const bankId = route.params.bankId
  if (bankId) {
    getById(bankId as string)
      .then(res => {
        questionBank.value = res.data
      })
    const condition: QuestionInfoCondition = {
      current: 1,
      size: 500,
      bankId: String(bankId)
    }
    listByBankId(condition)
      .then(res => {
        const records = res.data.records
        const map = new Map<string, QuestionInfo[]>()
        for (const info of records) {
          const groupName = info.groupName
          if (map.has(groupName)) {
            map.get(groupName)?.push(info)
          } else {
            map.set(groupName, [info])
          }
        }
        questionInfoMap.value = map
      })
  } else {
    ElMessage.warning('页面未找到')
    // TODO 2024/9/14 13:04 on dev-xfdzcoder: 应该跳转到题库页面
    router.replace({
      path: '/question/bank/detail'
    })
  }
})

</script>

<style scoped>

.title {
  font-size: 1.5rem;
  font-weight: bolder;
}
.info-line {
  display: flex;
}
.info-item {
  display: flex;
  margin-right: 20px;
}

.question-info-table {
  margin-bottom: 20px;
}
.group-title {
  font-size: 1.1rem;
  font-weight: bolder;
}
</style>
