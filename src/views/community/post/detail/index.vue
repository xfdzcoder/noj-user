<template>
  <div class="container">
    <div class="title">
      {{ postInfo?.title }}
    </div>
    <div class="summary">
      摘要：{{ postInfo?.summary }}
    </div>
    <div class="tags" v-if="postInfo?.tags">
      标签：
      <el-tag type="info" v-for="tag in postInfo?.tags.split(',')">
        {{ tag }}
      </el-tag>
    </div>
    <div class="author">
      <el-avatar shape="circle" size="small" :src="postInfo?.avatar" />
      <div>{{ postInfo?.authorName }}</div>
      <div>发表于：{{ postInfo?.createDateTime }}</div>
    </div>
    <div class="content">
      <MdPreview :content="postInfo?.content" />
    </div>
    <div class="comment">
      <!--      <PostComment :info-id="postInfo?.id" />-->
      <u-comment-scroll @more="moreComment" :disable="false">
        <u-comment
          :config="commentConfig as ConfigApi"
          @submit="submitComment"
          @reply-page="moreCommentReply"
          @like="likeComment"
          @before-data="beforeData"
        >
          <!-- <template>导航栏卡槽</template> -->
          <!-- <template #header>头部卡槽</template> -->
          <!-- <template #action="{ user }">动作卡槽{{ user.username }}</template> -->
          <!-- <template #avatar="{ id, user }">头像卡槽{{ user.avatar }}</template> -->
          <!-- <template #info>信息卡槽</template> -->
          <!-- <template #card>用户信息卡片卡槽</template> -->
          <!-- <template #func>功能区域卡槽</template> -->
        </u-comment>
      </u-comment-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContentByInfoId } from '@/api/community/post'
import { ElMessage } from 'element-plus'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
import MdPreview from '@/components/MdPreview/index.vue'
import {
  type CommentApi,
  type CommentReplyPageApi,
  type CommentSubmitApi,
  type ConfigApi, isArray, UComment,
  UCommentScroll, type UserApi
} from 'undraw-ui'
import emoji from '@/assets/emoji'
import { getComment, getLickCommentIdList, like, save } from '@/api/community/comment'
import type { Page } from '@/api/common'
import { useUserStore } from '@/stores/userInfo'
import { getDateStr } from '@/utils/time'
// import PostComment from '@/views/community/post/detail/components/comment.vue'

defineOptions({
  name: 'CommunityPostDetail'
})

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const { postInfo } = storeToRefs(postStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const commentConfig = reactive<ConfigApi>({
  comments: [],
  emoji: emoji,
  user: {
    id: userInfo.value?.id as string,
    username: userInfo.value?.nickname as string,
    avatar: userInfo.value?.avatar as string,
    likeIds: []
  },
  relativeTime: true,
  show: {
    level: false,
    homeLink: false,
    address: false
  },
  page: true
})
const commentPage = ref<Page<CommentApi>>({
  current: 1,
  pages: 10,
  records: [],
  size: 0,
  total: 0
})
// 加载前评论数据处理 自定义别名nickname转换username
const beforeData = (val: any) => {
  val.user.username = val.user.nickname
}
const moreComment = () => {
  getComment({
    current: commentPage.value.current + 1,
    size: commentPage.value.size,
    postInfoId: route.params.infoId as string
  }).then(res => {
    commentPage.value = res.data
    commentConfig.comments = res.data.records
  })
}
const moreCommentReply = ({ parentId, pageNum, pageSize, finish }: CommentReplyPageApi) => {
  console.log('moreCommentReply:', parentId, pageNum, pageSize)
  getComment({
    parentId: parentId,
    current: pageNum,
    size: pageSize,
    postInfoId: route.params.infoId as string
  }).then(res => {
    finish({
      total: res.data.total,
      list: res.data.records
    })
  })
}
const submitComment = ({ content, parentId, finish }: CommentSubmitApi) => {
  save({
    content: content,
    parentId: parentId as string,
    postInfoId: route.params.infoId as string
  }).then(res => {
    const comment = res.data
    comment.uid = userInfo.value?.id
    comment.user = {
      id: userInfo.value?.id,
      nickname: userInfo.value?.nickname,
      avatar: userInfo.value?.avatar
    }
    comment.createTime = new Date()
    finish(comment)
    ElMessage.success('评论成功')
  })
}
// 点赞按钮事件
const likeComment = (id: string, finish: () => void) => {
  like({
    commentId: id,
    postInfoId: route.params.infoId as string
  }).then(res => {
    finish()
    ElMessage.success('点赞成功')
  })
}

const init = () => {
  const infoId = route.params.infoId
  if (! infoId) {
    ElMessage.warning('文章不存在')
    router.back()
    return
  }
  getContentByInfoId(infoId as string)
    .then(res => {
      if (postInfo.value) {
        postInfo.value.content = res.data
      }
    })
  getComment({
    current: 1,
    postInfoId: infoId as string,
    size: 10
  })
    .then(res => {
      commentConfig.comments = res.data.records
      commentPage.value = res.data
    })
  getLickCommentIdList(infoId as string)
    .then(res => {
      commentConfig.user.likeIds = res.data
    })
}
onMounted(() => {
  if (! postInfo.value) {
    ElMessage.warning('未找到文章')
    router.back()
    return
  }
  init()
})

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 90vh;
}

.container > div {
  margin-top: 10px;
}

.title {
  font-size: 1.5rem;
  font-weight: bolder;
}

.summary {
  color: gray;
}

.author {
  display: flex;
  align-items: center;
}

.author > * {
  margin-right: 10px;
}
</style>
