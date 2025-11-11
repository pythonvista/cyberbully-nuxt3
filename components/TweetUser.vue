<template>
  <div class="border-b border-gray-800 hover:bg-gray-900 bg-black">
    <div class="p-4">
      <div class="flex items-center mb-3">
        <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-bold text-sm">E</span>
        </div>
        <div>
          <div class="font-bold text-white text-sm">{{ tweetData.name }}</div>
          <div class="text-gray-400 text-sm">@{{ tweetData.username }}</div>
        </div>
      </div>
      <div class="mb-3">
        <p class="text-sm leading-6 text-white">{{ tweetData.content }}</p>
      </div>
      
      <!-- Analysis Results -->
      <div v-if="tweetData.analysis" class="mb-3 p-3 rounded-lg" :class="getAnalysisClass(tweetData.analysis.riskLevel)">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-3 h-3 rounded-full" :class="getRiskColor(tweetData.analysis.riskLevel)"></div>
          <span class="text-sm font-medium" :class="getRiskTextColor(tweetData.analysis.riskLevel)">
            {{ getRiskLabel(tweetData.analysis.riskLevel) }}
          </span>
          <span class="text-xs text-gray-400">
            ({{ Math.round(tweetData.analysis.confidence * 100) }}% confidence)
          </span>
        </div>
        <div v-if="tweetData.analysis.categories && tweetData.analysis.categories.length > 0" class="text-xs text-gray-300">
          Categories: {{ tweetData.analysis.categories.join(', ') }}
        </div>
      </div>
      
      <div class="flex gap-6">
        <button 
          @click="toggleComments" 
          class="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-xs transition-colors"
          :class="{ 'text-blue-400': showComments }"
        >
          <Icons icon="comment" class="w-4" />
          <span>{{ stats.replies }}</span>
        </button>
        <button 
          @click="handleRetweet" 
          class="flex items-center gap-2 text-gray-400 hover:text-green-400 text-xs transition-colors"
        >
          <Icons icon="retweet" class="w-4" />
          <span>{{ stats.retweets }}</span>
        </button>
        <button 
          @click="handleLike" 
          class="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-colors"
          :class="{ 'text-red-400': isLiked }"
        >
          <Icons icon="like" class="w-4" />
          <span>{{ stats.likes }}</span>
        </button>
        <button class="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-xs transition-colors">
          <Icons icon="share" class="w-4" />
        </button>
      </div>
    </div>

    <!-- Comments Section -->
    <div v-if="showComments" class="border-t border-gray-800 bg-black">
      <!-- Comment Input -->
      <div class="p-4 border-b border-gray-800">
        <div class="flex gap-3">
          <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-xs">E</span>
          </div>
          <div class="flex-1">
            <textarea
              v-model="newComment"
              placeholder="Tweet your reply"
              class="w-full border-none outline-none resize-none text-sm leading-6 text-white bg-transparent min-h-20 max-h-48 placeholder-gray-500"
              @keydown.ctrl.enter="addReply"
              @keydown.meta.enter="addReply"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button
                @click="addReply"
                class="bg-white hover:bg-gray-200 text-black border-none rounded-full px-4 py-2 font-bold cursor-pointer transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed text-sm"
                :disabled="!newComment.trim()"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div v-if="tweetComments.length > 0" class="divide-y divide-gray-800">
        <div v-for="comment in tweetComments" :key="comment.id" class="p-4 hover:bg-gray-900/50">
          <div class="flex gap-3">
            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-xs">{{ comment.author.charAt(0) }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-white text-sm">{{ comment.author }}</span>
                <span class="text-gray-400 text-sm">@{{ comment.username }}</span>
                <span class="text-gray-400 text-xs">·</span>
                <span class="text-gray-400 text-xs">{{ formatTime(comment.timestamp) }}</span>
              </div>
              <p class="text-sm leading-6 text-white">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="p-4 text-center text-gray-400 text-sm">
        No replies yet. Be the first to reply!
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  i: {
    type: Object,
    required: true
  }
})

const appStore = useAppStore()
const showComments = ref(false)
const newComment = ref('')
const isLiked = ref(false)

const tweetId = computed(() => props.i.id || null)

const tweetData = computed(() => ({
  id: props.i.id || Date.now(),
  name: props.i.author || 'Current User',
  username: 'currentUser',
  avatar: 'https://via.placeholder.com/48',
  content: props.i.content,
  analysis: props.i.analysis
}))

const stats = computed(() => {
  if (tweetId.value) {
    return appStore.getTweetStats(tweetId.value)
  }
  return { replies: 0, retweets: 0, likes: 0 }
})

const tweetComments = computed(() => {
  if (tweetId.value) {
    return appStore.getTweetComments(tweetId.value)
  }
  return []
})

const toggleComments = () => {
  showComments.value = !showComments.value
}

const addReply = () => {
  if (newComment.value.trim() && tweetId.value) {
    appStore.addComment(tweetId.value, newComment.value.trim())
    newComment.value = ''
  }
}

const handleLike = () => {
  if (tweetId.value) {
    appStore.incrementLike(tweetId.value)
    isLiked.value = !isLiked.value
  }
}

const handleRetweet = () => {
  if (tweetId.value) {
    appStore.incrementRetweet(tweetId.value)
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  return date.toLocaleDateString()
}

// Initialize stats if tweet doesn't have them
onMounted(() => {
  if (tweetId.value) {
    const stats = appStore.getTweetStats(tweetId.value)
    if (!stats || stats.replies === undefined) {
      appStore.updateTweetStats(tweetId.value, { replies: 0, retweets: 0, likes: 0 })
    }
  }
})

const getAnalysisClass = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return 'bg-red-900/20 border border-red-500/30'
    case 'moderate':
      return 'bg-yellow-900/20 border border-yellow-500/30'
    case 'low':
      return 'bg-green-900/20 border border-green-500/30'
    default:
      return 'bg-gray-800 border border-gray-600'
  }
}

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return 'bg-red-500'
    case 'moderate':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const getRiskTextColor = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return 'text-red-400'
    case 'moderate':
      return 'text-yellow-400'
    case 'low':
      return 'text-green-400'
    default:
      return 'text-gray-400'
  }
}

const getRiskLabel = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return 'High Risk - Cyberbullying Detected'
    case 'moderate':
      return 'Moderate Risk - Potentially Harmful'
    case 'low':
      return 'Low Risk - Safe Content'
    default:
      return 'Analysis Pending'
  }
}
</script>

