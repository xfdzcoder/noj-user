<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" @click="toEditView">发布</el-button>
    </div>
    <div class="main-aside">
      <div class="main">
        <PostInfoPreview
          v-for="info in postInfoPage.records"
          :info="info"
        />
      </div>
      <div class="aside">
        <el-table :data="bankList" @row-click="onClickBank">
          <el-table-column type="index" width="50" align="center" label="排名" />
          <el-table-column label="名称" prop="name" />
          <el-table-column label="学习人数" prop="studyCount" align="center" />
          <el-table-column label="好评率" align="center">
            <template #default="scope">
              {{ (scope.row.goodCount * 100.0 / scope.row.studyCount).toFixed(2) }}&ensp;%
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PostInfo } from '@/api/community'
import type { Page } from '@/api/common'
import PostInfoPreview from '@/views/community/info/components/PostInfoPreview.vue'
import type { QuestionBank } from '@/api/question'
import { pageQuestion } from '@/api/question/bank'
import { useRoute, useRouter } from 'vue-router'
import { listPostInfo } from '@/api/community/post'

defineOptions({
  name: 'CommunityInfo'
})

const route = useRoute()
const router = useRouter()

const postInfoPage = ref<Page<PostInfo>>({
  current: 1, pages: 1, records: [], size: 10, total: 0
})


const bankList = ref<QuestionBank[]>([])
const onClickBank = (row: QuestionBank, column: any, event: Event): void => {
  router.push({
    path: '/question/bank/' + row.id
  })
}

const toEditView = () => {
  router.push({
    path: '/community/post/edit/' + route.params.infoId
  })
}

onMounted(() => {
  listPostInfo({
    current: 1,
    size: 10,
    lastId: null,
    communityInfoId: route.params.infoId as string
  }).then(res => {
    postInfoPage.value = res.data
  })
  pageQuestion({
    current: 1,
    size: 100,
    communityInfoId: route.params.infoId as string
  }).then(res => {
    bankList.value = res.data.records.sort((b1, b2) => b2.studyCount - b1.studyCount)
  })
})

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4vh;
}

.main-aside {
  display: flex;
  align-items: flex-start;
}

.main {
  width: 70%;
  height: 90vh;
  overflow: auto;
}

.aside {
  width: 30%;
  height: 90vh;
  overflow: auto;
}
</style>
