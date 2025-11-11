import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoggedIn = ref(false)
  const currentUser = ref(null)
  const tweets = ref([])
  const loading = ref(false)
  const comments = ref({}) // { tweetId: [comments] }
  const tweetStats = ref({}) // { tweetId: { replies: 0, retweets: 0, likes: 0 } }

  // Getters
  const tweetCount = computed(() => tweets.value.length)
  const isAuthenticated = computed(() => isLoggedIn.value && currentUser.value)
  
  const getTweetComments = (tweetId) => {
    return comments.value[tweetId] || []
  }
  
  const getTweetStats = (tweetId) => {
    return tweetStats.value[tweetId] || { replies: 0, retweets: 0, likes: 0 }
  }

  // Actions
  const login = (user) => {
    isLoggedIn.value = true
    currentUser.value = user
  }

  const logout = () => {
    isLoggedIn.value = false
    currentUser.value = null
    tweets.value = []
    comments.value = {}
    tweetStats.value = {}
  }

  const addTweet = (tweet) => {
    const tweetId = tweet.id || Date.now()
    tweets.value.unshift({
      id: tweetId,
      ...tweet,
      timestamp: new Date()
    })
    // Initialize stats and comments for new tweet
    if (!tweetStats.value[tweetId]) {
      tweetStats.value[tweetId] = { replies: 0, retweets: 0, likes: 0 }
    }
    if (!comments.value[tweetId]) {
      comments.value[tweetId] = []
    }
  }

  const removeTweet = (tweetId) => {
    const index = tweets.value.findIndex(tweet => tweet.id === tweetId)
    if (index > -1) {
      tweets.value.splice(index, 1)
    }
    // Clean up comments and stats
    delete comments.value[tweetId]
    delete tweetStats.value[tweetId]
  }

  const addComment = (tweetId, commentText) => {
    if (!comments.value[tweetId]) {
      comments.value[tweetId] = []
    }
    const comment = {
      id: Date.now(),
      content: commentText,
      author: currentUser.value?.name || 'Current User',
      username: currentUser.value?.username || 'currentUser',
      timestamp: new Date(),
      avatar: currentUser.value?.avatar || 'https://via.placeholder.com/48'
    }
    comments.value[tweetId].push(comment)
    // Update reply count
    if (tweetStats.value[tweetId]) {
      tweetStats.value[tweetId].replies = comments.value[tweetId].length
    } else {
      tweetStats.value[tweetId] = { replies: 1, retweets: 0, likes: 0 }
    }
    return comment
  }

  const removeComment = (tweetId, commentId) => {
    if (comments.value[tweetId]) {
      const index = comments.value[tweetId].findIndex(c => c.id === commentId)
      if (index > -1) {
        comments.value[tweetId].splice(index, 1)
        // Update reply count
        if (tweetStats.value[tweetId]) {
          tweetStats.value[tweetId].replies = comments.value[tweetId].length
        }
      }
    }
  }

  const updateTweetStats = (tweetId, stats) => {
    if (!tweetStats.value[tweetId]) {
      tweetStats.value[tweetId] = { replies: 0, retweets: 0, likes: 0 }
    }
    tweetStats.value[tweetId] = { ...tweetStats.value[tweetId], ...stats }
  }

  const incrementLike = (tweetId) => {
    if (!tweetStats.value[tweetId]) {
      tweetStats.value[tweetId] = { replies: 0, retweets: 0, likes: 0 }
    }
    tweetStats.value[tweetId].likes = (tweetStats.value[tweetId].likes || 0) + 1
  }

  const incrementRetweet = (tweetId) => {
    if (!tweetStats.value[tweetId]) {
      tweetStats.value[tweetId] = { replies: 0, retweets: 0, likes: 0 }
    }
    tweetStats.value[tweetId].retweets = (tweetStats.value[tweetId].retweets || 0) + 1
  }

  const setLoading = (value) => {
    loading.value = value
  }

  return {
    // State
    isLoggedIn,
    currentUser,
    tweets,
    loading,
    comments,
    tweetStats,
    
    // Getters
    tweetCount,
    isAuthenticated,
    getTweetComments,
    getTweetStats,
    
    // Actions
    login,
    logout,
    addTweet,
    removeTweet,
    addComment,
    removeComment,
    updateTweetStats,
    incrementLike,
    incrementRetweet,
    setLoading
  }
})
