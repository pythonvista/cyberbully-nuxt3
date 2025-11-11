<template>
  <div v-show="isVideoMode" class="flex items-start p-4 cursor-pointer border-b border-gray-800 hover:bg-gray-900 bg-black">
    <img :src="userData.pictureUrl" class="mr-4 rounded-full w-12 h-12" />
    <div class="w-full">
      <div class="flex items-start mb-3">
        <p class="font-bold text-white mr-1 text-sm">{{ userData.firstName + ' ' + userData.lastName }}</p>
        <p class="text-gray-400 mr-1 text-sm" v-show="userData.userId">@{{ userData.userId }}</p>
        <span class="text-gray-400 mr-1 text-sm">•</span>
        <p class="text-gray-400 text-sm">{{ date }}h</p>
      </div>
      <div class="mb-3">
        <p class="text-sm leading-6 text-white">
          {{ tweetBody.content }}
        </p>
        
        <!-- Category Hashtags -->
        <div v-if="analysisResult && analysisResult.categories && analysisResult.categories.length > 0" class="flex flex-wrap gap-2 mt-2">
          <span 
            v-for="category in analysisResult.categories" 
            :key="category"
            class="text-xs px-2 py-1 rounded-full font-semibold"
            :class="getCategoryTagClass(category)"
          >
            #{{ category }}
          </span>
        </div>
        
        <!-- Analysis Results Badge -->
        <div v-if="analysisResult && analysisResult.riskLevel !== 'low'" class="mt-3 p-3 rounded-lg" :class="getAnalysisClass(analysisResult.riskLevel)">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :class="getRiskColor(analysisResult.riskLevel)"></div>
            <span class="text-sm font-medium" :class="getRiskTextColor(analysisResult.riskLevel)">
              {{ getRiskLabel(analysisResult.riskLevel) }}
            </span>
            <span class="text-xs text-gray-400">
              ({{ Math.round(analysisResult.confidence * 100) }}% confidence)
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-around w-full">
        <button 
          @click="toggleComments" 
          class="flex items-center justify-center hover:text-blue-400 group transition-colors"
          :class="{ 'text-blue-400': showComments }"
        >
          <Icons icon="comment" class="w-4 p-2 mr-1 group-hover:bg-blue-900 rounded-full" />
          <span v-show="replyNumber" class="text-xs text-gray-400">{{ replyNumber }}</span>
        </button>
        <button 
          @click="handleRetweet" 
          class="flex items-center justify-center hover:text-green-400 group transition-colors"
        >
          <Icons icon="retweet" class="w-4 p-2 mr-1 group-hover:bg-green-900 rounded-full" />
          <span v-show="reTweetNumber" class="text-xs text-gray-400">{{ reTweetNumber }}</span>
        </button>
        <button 
          @click="handleLike" 
          class="flex items-center justify-center hover:text-red-400 group transition-colors"
          :class="{ 'text-red-400': isLiked }"
        >
          <Icons icon="like" class="w-4 p-2 mr-1 group-hover:bg-red-900 rounded-full" />
          <span v-show="likeNumber" class="text-xs text-gray-400">{{ likeNumber }}</span>
        </button>
        <button class="flex items-center justify-center hover:text-blue-400 group transition-colors">
          <Icons icon="share" class="w-4 p-2 group-hover:bg-blue-900 rounded-full" />
        </button>
      </div>
      
      <!-- Comments Section -->
      <div v-if="showComments" class="mt-4 pt-4 border-t border-gray-800">
        <!-- Comment Input -->
        <div class="mb-4">
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
          <div v-for="comment in tweetComments" :key="comment.id" class="py-3 hover:bg-gray-900/50 px-2 rounded">
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
        <div v-else class="text-center text-gray-400 text-sm py-4">
          No replies yet. Be the first to reply!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getWeightedRandomQuote } from '~/data/quotes.js'
import { useCyberbullyDetection } from '~/composables/useCyberbullyDetection.js'

const appStore = useAppStore()
const cyberbullyDetection = useCyberbullyDetection()

const likeNumber = ref(null)
const reTweetNumber = ref(null)
const replyNumber = ref(null)
const date = ref(null)
const isVideoMode = ref(false)
const showComments = ref(false)
const newComment = ref('')
const isLiked = ref(false)
const tweetId = ref(null)

const userData = ref({
  firstName: null,
  lastName: null,
  pictureUrl: null,
  userId: null
})

const tweetBody = ref({
  content: '',
  author: '',
  category: null
})

const analysisResult = ref(null)

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
    replyNumber.value = (replyNumber.value || 0) + 1
  }
}

const handleLike = () => {
  likeNumber.value = (likeNumber.value || 0) + 1
  isLiked.value = !isLiked.value
  if (tweetId.value) {
    appStore.incrementLike(tweetId.value)
  }
}

const handleRetweet = () => {
  reTweetNumber.value = (reTweetNumber.value || 0) + 1
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

const addLike = () => {
  likeNumber.value += 1
}

const randomUser = async () => {
  try {
    const response = await $fetch('https://randomuser.me/api/')
    const value = response.results[0]
    userData.value.firstName = value.name.first
    userData.value.lastName = value.name.last
    userData.value.pictureUrl = value.picture.medium
    userData.value.userId = value.id.name
  } catch (error) {
    console.log(error)
    // Fallback if API fails
    userData.value.firstName = 'User'
    userData.value.lastName = String(Math.floor(Math.random() * 1000))
    userData.value.pictureUrl = 'https://via.placeholder.com/48'
    userData.value.userId = 'user' + Math.floor(Math.random() * 1000)
  }
}

const getQuote = () => {
  try {
    // Get weighted random quote from local data
    const quote = getWeightedRandomQuote()
    tweetBody.value.content = quote.content
    tweetBody.value.author = quote.author.replace(/\s+/g, '') // Remove spaces for hashtag
    tweetBody.value.category = quote.category || 'normal'
    
    // Analyze the quote for cyberbullying
    analysisResult.value = cyberbullyDetection.analyze(quote.content, quote.category)
  } catch (error) {
    console.error('Error loading quote:', error)
    // Fallback quote
    tweetBody.value.content = "The only way to do great work is to love what you do."
    tweetBody.value.author = "SteveJobs"
    tweetBody.value.category = 'normal'
    analysisResult.value = cyberbullyDetection.analyze(tweetBody.value.content, 'normal')
  }
}

const getCategoryTagClass = (category) => {
  const classes = {
    bullying: 'bg-red-500/20 text-red-400 border border-red-500/30',
    racist: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    sexist: 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
  }
  return classes[category] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
}

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

const setRandomValue = () => {
  let comment = Math.floor(Math.random() * 50) + 1
  let reTweet = Math.floor(comment * 4.3)
  let like = Math.floor(reTweet * 15.7)

  reTweetNumber.value = reTweet
  likeNumber.value = like
  replyNumber.value = comment
  date.value = Math.floor(Math.random() * 24) + 1
}

onMounted(async () => {
  // Load quote synchronously (no API call)
  getQuote()
  await randomUser()
  setRandomValue()
  
  // Generate unique ID for this tweet
  tweetId.value = Date.now() + Math.random()
  
  // Initialize stats in store
  appStore.updateTweetStats(tweetId.value, {
    replies: replyNumber.value || 0,
    retweets: reTweetNumber.value || 0,
    likes: likeNumber.value || 0
  })

  setTimeout(() => {
    isVideoMode.value = true
  }, 1000)
})
</script>

