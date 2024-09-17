<template>
  <div class="container">
    <div class="main">
      <div class="main-left">
        <div class="hot-calendar">
          <calendar-heatmap
            :values="heatmap"
            :end-date="getDateStr(new Date())"
          />
        </div>
        <div class="question-bank-list">
          <el-table :data="questionBankList" stripe @row-click="onClickBank" height="73vh">
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
        <h3>社群热度榜</h3>
        <div class="community-list">
          <el-table :data="communityList" @row-click="onClickCommunity">
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
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import { onMounted, ref } from 'vue'
import { hotCommunity } from '@/api/community/info'
import type { CommunityInfo } from '@/api/community'
import { pageQuestion } from '@/api/question/bank'
import type { Heatmap, QuestionBank } from '@/api/question'
import { getHeatmap } from '@/api/question/execute-result'
import { useRouter } from 'vue-router'
import { getDateStr } from '@/utils/time'

defineOptions({
  name: 'Index'
})
const router = useRouter()

const heatmap = ref<Heatmap[]>([])
const questionBankList = ref<QuestionBank[]>([])
const onClickBank = (row: QuestionBank, column: any, event: Event): void => {
  router.push({
    path: '/question/bank/' + row.id
  })
}


const communityList = ref<CommunityInfo[]>([])
const onClickCommunity = (row: CommunityInfo, column: any, event: Event) => {
  router.push({
    path: '/community/info/' + row.id
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
  height: 17vh;
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
