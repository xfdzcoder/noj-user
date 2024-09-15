<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <div class="title">
      <span>{{ questionInfo.sort }}.&ensp;{{ questionInfo.title }}</span>
    </div>
    <div class="info-line">
      <div class="timeout">
        时间限制：
        <span>{{ questionInfo.timeout }}&ensp;ms</span>
      </div>
      <div class="memory">
        内存限制：
        <span>{{ formatBytes(questionInfo.memory) }}</span>
      </div>
      <div class="difficultly">
        难度：
        <span>{{ dataResolver.difficultly(questionInfo.difficulty) }}</span>
      </div>
    </div>
    <div class="tags">
      <el-tag type="info" v-for="item in dataResolver.tags(questionInfo.tags)">
        {{ item }}
      </el-tag>
    </div>
    <div class="description">
<!--      {{ questionInfo.description?.repeat(40) }}-->
      <editor-md
        style="height: 100%"
        v-model="questionInfo.description"
        :mode="'readonly'"
        :md-rules="{
                linkify: {
                  fuzzyLink: false,
                },
              }"
        :toolbar-config="[]"
      ></editor-md>
    </div>
    <div class="info-line">
      <div class="submit-count">
        提交次数：
        <span>{{ questionInfo.submitCount }}</span>
      </div>
      <div class="pass-count">
        通过次数：
        <span>{{ questionInfo.passCount }}</span>
      </div>
      <div class="comment-count">
        评论数量：
        <span>{{ questionInfo.commentCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { formatBytes } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { getById } from '@/api/question/info'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { EditorMd } from 'vue-devui'

defineOptions({
  name: 'QuestionInfo'
})
const router = useRouter()
const route = useRoute()
const questionStore = useQuestionStore()
const { questionInfo } = storeToRefs(questionStore)

const dataResolver = {
  difficultly: (difficult: number) => {
    switch (difficult) {
      case 0:
        return '简单'
      case 1:
        return '中等'
      case 2:
        return '困难'
      default:
        return '未知'
    }
  },
  tags: (tags: string) => {
    return tags ? tags.split(',') : ''
  }
}


onMounted(() => {
  let questionInfoId = route.params.questionInfoId
  questionInfoId = '1829045838811627522'
  if (questionInfoId) {
    getById(String(questionInfoId))
      .then(res => {
        questionInfo.value = res.data
      })
  } else {
    ElMessage.warning('页面未找到')
    // TODO 2024/9/14 13:04 on dev-xfdzcoder: 应该跳转到题库页面
    router.replace({
      path: '/index'
    })
  }
})


</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
}
.container > div {
  margin-bottom: 10px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.info-line {
  display: flex;
}
.info-line > div {
  margin-right: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}
.tags > .el-tag {
  margin-right: 10px;
}


:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container) {
  padding: 10px;
  border: none;
}
:deep(.dp-md-container.dp-md-readonly .dp-md-toolbar-container) {
  display: none;
}
</style>
