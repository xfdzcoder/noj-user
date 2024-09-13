<template>
  <div class="container">
    <div class="left">

      <component :is="leftComponent"
                 @change-right="changeRight"
                 @change-left="changeLeft"
                 @reset="reset"
      />
    </div>
    <div class="right">
      <component :is="rightComponent"
                 @show-result-detail="showResultDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
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

const leftComponent = shallowRef(components.get('QuestionResult'))
const rightComponent = shallowRef(components.get('QuestionCode'))

const changeLeft = (componentName: string | undefined): void => {
  if (componentName) {
    leftComponent.value = components.get(componentName)
  } else {
    leftComponent.value = components.get('QuestionResult')
  }
}
const changeRight = (componentName: string | undefined): void => {
  if (componentName) {
    rightComponent.value = components.get(componentName)
  } else {
    rightComponent.value = components.get('QuestionCode')
  }
}
const reset = () => {
  leftComponent.value = components.get('QuestionResult')
  rightComponent.value = components.get('QuestionCode')
}
const showResultDetail = (): void => {
  leftComponent.value = components.get('QuestionResultDetail')
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
