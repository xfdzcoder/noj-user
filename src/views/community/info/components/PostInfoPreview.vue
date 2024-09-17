<template>
  <div class="post-info-box">
    <div class="user-info">
      <el-avatar shape="circle" :src="props.info.avatar" />
      <div>
        {{ props.info.authorName }}
      </div>
    </div>
    <div class="title">
      {{ props.info.title }}
    </div>
    <div class="summary">
      {{ props.info.summary }}
    </div>
    <div class="info-line">
      <div class="thumbs-up">
        <el-icon v-if="props.info.good">
          <svg t="1726552125991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4885" width="32" height="32">
            <path
              d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
              p-id="4886" fill="#2c2c2c"></path>
          </svg>
        </el-icon>
        <el-icon v-else>
          <svg t="1726551834184" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4243" width="32" height="32">
            <path
              d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
              p-id="4244" fill="#2c2c2c"></path>
          </svg>
        </el-icon>
        {{ props.info.goodCount ?? '' }}
      </div>
      <div class="comment">
        <el-icon><ChatLineRound /></el-icon>
        {{ props.info.commentCount ?? '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatLineRound } from '@element-plus/icons-vue'
import type { PostInfo } from '@/api/community'

defineOptions({
  name: 'PostInfoPreview'
})

const props = defineProps<{
  info: PostInfo
}>()

</script>

<style scoped>
.post-info-box {
  padding: 10px;
  box-sizing: border-box;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info > .el-avatar {
  margin-right: 10px;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
}

.title,
.summary {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.info-line > div {
  margin-right: 10px;
}
</style>
