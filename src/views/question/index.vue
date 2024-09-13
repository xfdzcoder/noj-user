<template>
  <div class="container">
    <div class="left">
      <el-tabs type="border-card" v-model="leftTab" @tab-remove="showResultDetail.remove('left')">
        <el-tab-pane label="题目详情" name="QuestionInfo">
          <QuestionInfo />
        </el-tab-pane>
        <el-tab-pane label="提交记录" name="QuestionResult">
          <QuestionResult @show-result-detail="showResultDetail.show" />
        </el-tab-pane>
        <el-tab-pane v-if="showResultDetail.left" label="执行结果" closable name="QuestionResultDetail">
          <QuestionResultDetail :key="detailRefreshKey" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <el-tabs type="border-card" v-model="rightTab" @tab-remove="showResultDetail.remove('right')">
        <el-tab-pane label="代码" name="QuestionCode">
          <QuestionCode @show-result-detail="() => showResultDetail.show('left')" />
        </el-tab-pane>
        <el-tab-pane v-if="showResultDetail.right" label="执行结果" closable name="QuestionResultDetail">
          <QuestionResultDetail :key="detailRefreshKey" fetch />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuestionResult from '@/views/question/components/result/index.vue'
import QuestionResultDetail from '@/views/question/components/result/detail.vue'
import QuestionCode from '@/views/question/components/code/index.vue'
import QuestionInfo from '@/views/question/components/info/index.vue'
import { useQuestionStore } from '@/stores/question'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'Question'
})

type TabName =
  'QuestionInfo' |
  'QuestionResult' |
  'QuestionResultDetail' |
  'QuestionCode'

const questionStore = useQuestionStore()
const { currentExecuteResult } = storeToRefs(questionStore)

const leftTab = ref<TabName>('QuestionResult')
const rightTab = ref<TabName>('QuestionCode')
const detailRefreshKey = ref<number>(0)

const showResultDetail = ref({
  left: false,
  right: false,
  show: (direct: 'left' | 'right') => {
    if (direct === 'left') {
      if (leftTab.value != 'QuestionResultDetail') {
        showResultDetail.value.left = true
        showResultDetail.value.right = false
        leftTab.value = 'QuestionResultDetail'
      }
    } else {
      if (rightTab.value != 'QuestionResultDetail') {
        showResultDetail.value.left = false
        showResultDetail.value.right = true
        rightTab.value = 'QuestionResultDetail'
      }
    }
    detailRefreshKey.value = detailRefreshKey.value + 1
  },
  remove: (direct: 'left' | 'right') => {
    if (direct === 'left') {
      leftTab.value = 'QuestionInfo'
      showResultDetail.value.left = false
    } else {
      rightTab.value = 'QuestionCode'
      showResultDetail.value.right = false
    }
  }
})


</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.left {
  width: 50%;
}

.right {
  width: 50%;
}

.el-tabs,
.el-tabs__content,
.el-tab-pane {
  height: 100%;
}
</style>
