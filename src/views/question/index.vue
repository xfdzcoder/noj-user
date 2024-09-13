<template>
  <div class="container">
    <div class="left">

      <component :is="components.get(leftComponentName)"
                 @change-right="changeRight"
                 @change-left="changeLeft"
                 @reset="reset"
      />
    </div>
    <div class="right">
      <component :is="components.get(rightComponentName)"
                 :key="rightKey"
                 @show-result-detail="showResultDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import QuestionResult from '@/views/question/components/result/index.vue'
import QuestionResultDetail from '@/views/question/components/result/detail.vue'
import QuestionCode from '@/views/question/components/code/index.vue'
import QuestionInfo from '@/views/question/components/info/index.vue'

defineOptions({
  name: 'Question'
})

const components = new Map<string, InstanceType<any>>([
  ['QuestionInfo', QuestionInfo],
  ['QuestionResult', QuestionResult],
  ['QuestionResultDetail', QuestionResultDetail],
  ['QuestionCode', QuestionCode],
])

const leftComponentName = ref<string>('QuestionResult')
const rightComponentName = ref<string>('QuestionCode')
const rightKey = ref<number>(-999999)

const changeLeft = (componentName: string | undefined) => {
  if (componentName) {
    if (leftComponentName.value == componentName) {
      return
    }
    leftComponentName.value = componentName
  } else {
    leftComponentName.value = 'QuestionResult'
  }
}
const changeRight = (componentName: string | undefined): void => {
  if (componentName) {
    rightKey.value = rightKey.value + 1
    if (rightComponentName.value == componentName) {
      return
    }
    rightComponentName.value = componentName
  } else {
    rightComponentName.value = 'QuestionCode'
  }
}
const reset = () => {
  leftComponentName.value = 'QuestionResult'
  rightComponentName.value = 'QuestionCode'
}
const showResultDetail = (): void => {
  leftComponentName.value = 'QuestionResultDetail'
}

// const questionInfoId = ref<string>('1829045838811627522')

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
</style>
