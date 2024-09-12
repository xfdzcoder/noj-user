<template>
  <div class="container">
    <div class="left">

      <component :is="leftComponent"
                 @change-right="changeRight"
      />
    </div>
    <div class="right">
      <component :is="rightComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuestionResult from '@/views/question/info/components/left/result-list.vue'
import QuestionResultDetail from '@/views/question/info/components/right/result-detail.vue'
import QuestionCode from '@/views/question/info/components/right/code.vue'

defineOptions({
  name: 'QuestionInfo'
})

const leftComponents = ref([
  QuestionResult
])
const rightComponents = ref([
  QuestionCode,
  QuestionResultDetail
])

const leftComponent = ref(leftComponents.value[0])
const rightComponent = ref(rightComponents.value[0])

const changeRight = (index: number) => {
  rightComponent.value = rightComponents.value[index]
}

</script>

<style scoped>
.container {
  display: flex;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
}
</style>
