<template>
  <div class="container">
    <div class="main">
      <PostInfoPreview
        v-for="info in new Array(100).fill(postInfoPage.records).flat()"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PostInfo } from '@/api/community'
import type { Page } from '@/api/common'
import PostInfoPreview from '@/views/community/info/components/PostInfoPreview.vue'
import type { QuestionBank } from '@/api/question'
import { pageQuestion } from '@/api/question/bank'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'CommunityInfo'
})

const route = useRoute()
const router = useRouter()

const postInfoPage = ref<Page<PostInfo>>({
  current: 0, pages: 0, size: 0, total: 0,
  records: [
    {
      id: '1',
      author: '1',
      communityInfoId: '1',
      title: '1',
      summary: '1',
      tags: '1',
      type: 0,
      goodCount: 1,
      commentCount: 1,
      topped: true,
      status: 1,
      good: true,
      avatar: '',
      authorName: '用户名称'
    }
  ]
})


const bankList = ref<QuestionBank[]>([])
const onClickBank = (row: QuestionBank, column: any, event: Event): void => {
  router.push({
    path: '/question/bank/' + row.id
  })
}

onMounted(() => {
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
