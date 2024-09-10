<template>
  <div class="container">
    <div class="main">
      <div class="main-left">
        <div class="hot-calendar">
          <calendar-heatmap
            :values="[]"
            :end-date="'2024-09-10'"
          />
        </div>
        <div class="question-bank-list">
          <el-table :data="questionBankList" stripe>
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
        <div class="recently-commit">
          <el-table :data="recentlyCommit">

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
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import { onMounted, ref } from 'vue'
import { hotCommunity } from '@/api/community/info'
import type { CommunityInfo } from '@/api/community'
import { pageQuestion } from '@/api/question/bank'
import type { QuestionCondition, QuestionInfo } from '@/api/question'
defineOptions({
  name: 'Index'
})

const questionBankList = ref<QuestionInfo[]>([])
const recentlyCommit = ref([])
const communityList = ref<CommunityInfo[]>([])

const init = () => {
  hotCommunity()
    .then(res => {
      communityList.value = res.data
    })
  const condition: QuestionCondition = {
    current: 1,
    size: 20
  }
  pageQuestion(condition)
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
</style>
