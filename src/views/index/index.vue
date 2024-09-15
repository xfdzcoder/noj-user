<template>
  <div class="container">
    <div class="main">
      <div class="main-left">
        <div class="hot-calendar">
          <calendar-heatmap
            :values="heatmap"
            :end-date="'2024-09-12'"
          />
        </div>
        <div class="question-bank-list">
          <el-table :data="questionBankList" stripe @row-click="onClickBank">
            <el-table-column label="状态" />
            <el-table-column label="编号" prop="identifier" />
            <el-table-column label="名称" prop="name" />
            <el-table-column label="题目题目数量" prop="questionCount" />
            <el-table-column label="好评数量" prop="goodCount" />
            <el-table-column label="学习人数" prop="studyCount" />
          </el-table>
        </div>
      </div>
      <div class="main-right">
        <h3>最近提交</h3>
        <div class="recently-execute-result">
          <el-table :data="recentlyExecuteResult"
                    @row-click="onClickRecentlyResult"
          >
            <el-table-column label="状态">
              <template #default="scope">
                <el-icon v-if="scope.row.succeed" class="result-success"><Select /></el-icon>
                <el-icon v-else class="result-fail"><CloseBold /></el-icon>
              </template>
            </el-table-column>
            <el-table-column label="题目名称" prop="questionInfo.title" />
            <el-table-column label="平均耗时(ms)" prop="avgTime" />
          </el-table>
        </div>
        <h3>社群热度榜</h3>
        <div class="community-list">
          <el-table :data="communityList">
            <el-table-column type="index" width="50" label="排名" />
            <el-table-column label="名称" prop="name" />
            <el-table-column label="帖子数量" prop="postCount" />
            <el-table-column label="学习人数" prop="starCount" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, CloseBold } from '@element-plus/icons-vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import { onMounted, ref } from 'vue'
import { hotCommunity } from '@/api/community/info'
import type { CommunityInfo } from '@/api/community'
import { pageQuestion } from '@/api/question/bank'
import type { ExecuteResult, Heatmap, QuestionBank } from '@/api/question'
import { getHeatmap, recently } from '@/api/question/execute-result'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Index'
})
const router = useRouter()

const heatmap = ref<Heatmap[]>([])
const questionBankList = ref<QuestionBank[]>([])
const recentlyExecuteResult = ref<ExecuteResult[]>([])
const communityList = ref<CommunityInfo[]>([])

const onClickRecentlyResult = (row: ExecuteResult, column: any, event: Event): void => {
  router.push({
    path: '/question/result/' + row.id
  })
}


const onClickBank = (row: QuestionBank, column: any, event: Event): void => {
  router.push({
    path: '/question/bank/' + row.id
  })
}


const init = () => {
  getHeatmap()
    .then(res => {
      heatmap.value = res.data
    })
  hotCommunity()
    .then(res => {
      communityList.value = res.data
    })
  pageQuestion({
    current: 1,
    size: 20
  })
    .then(res => {
      questionBankList.value = res.data.records
    })
  recently()
    .then(res => {
      recentlyExecuteResult.value = res.data
    })
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.main {
  display: flex;
  align-items: flex-start;
  border: 1px solid red;
  height: 100%;
}
.main-left {
  width: 70%;
}
.main-right {
  width: 30%;
}
.hot-calendar {
  font-size: 0.6rem;
  border: 1px solid red;
}
.question-bank-list {
  border: 1px solid red;
}
.recently-commit {
  border: 1px solid red;
}
.community-list {
  border: 1px solid red;
}
.result-success {
  color: green;
}
.result-fail {
  color: red;
}
</style>
