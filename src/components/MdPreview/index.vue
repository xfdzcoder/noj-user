<template>
  <editor-md
    style="height: 100%;width: 100%"
    v-model="props.content"
    :mode="'readonly'"
    :md-rules="{
                linkify: {
                  fuzzyLink: false,
                },
              }"
    :toolbar-config="[]"
  />
</template>

<script setup lang="ts">
import { EditorMd } from 'vue-devui'

defineOptions({
  name: 'MdPreview'
})
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})


</script>

<style scoped>
:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container) {
  padding: 10px;
  border: none;
}
:deep(.dp-md-container.dp-md-readonly .dp-md-toolbar-container),
:deep(.dp-md-editor) {
  display: none;
}
:deep(.dp-md-container .dp-md-content-container) {
  min-height: unset;
  height: 100%;
}
:deep(.dp-md-container.dp-md-readonly .dp-md-content-container .dp-editor-md-preview-container) {
  position: unset;
}
</style>
