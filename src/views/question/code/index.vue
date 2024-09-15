<template>
  <div class="container">
    <div class="left">
      <el-button class="return-btn" link @click="toBankDetailView"><&ensp;返回题库列表</el-button>
      <el-tabs type="border-card" v-model="leftTab" @tab-click="onLeftTabClick" @tab-remove="showResultDetail.remove('left')">
        <el-tab-pane label="题目详情" name="QuestionInfo">
          <QuestionInfo />
        </el-tab-pane>
        <el-tab-pane label="提交记录" name="QuestionResult">
          <QuestionResult ref="questionResultRef" @show-result-detail="showResultDetail.show" />
        </el-tab-pane>
        <el-tab-pane v-if="showResultDetail.left" label="执行结果" closable name="QuestionResultDetail">
          <QuestionResultDetail :key="detailRefreshKey" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <el-button link disabled>&ensp;</el-button>
      <el-tabs type="border-card" v-model="rightTab" @tab-remove="showResultDetail.remove('right')">
        <el-tab-pane label="代码" name="QuestionCode">
          <QuestionCodeEditor @show-result-detail="() => showResultDetail.show('left')" />
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
import QuestionResult from '@/views/question/code/components/result/index.vue'
import QuestionResultDetail from '@/views/question/code/components/result/detail.vue'
import QuestionCodeEditor from '@/views/question/code/components/code/index.vue'
import QuestionInfo from '@/views/question/code/components/info/index.vue'
import type { TabsPaneContext } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'CodeQuestion'
})

type TabName =
  'QuestionInfo' |
  'QuestionResult' |
  'QuestionResultDetail' |
  'QuestionCode'

const router = useRouter()

const questionResultRef = ref<InstanceType<typeof QuestionResult>>()

const leftTab = ref<TabName>('QuestionInfo')
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

const onLeftTabClick = (pane: TabsPaneContext, ev: Event): void => {
  if (pane.paneName as TabName === 'QuestionResult') {
    questionResultRef.value?.init()
  }
}

const toBankDetailView = () => {
  router.back()
}

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

.return-btn {
  font-size: 1rem;
}
</style>
