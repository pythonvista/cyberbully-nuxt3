import { defineStore } from 'pinia'

export const useCyberbullyStore = defineStore('cyberbully', () => {
  // State
  const detectedTweets = ref([])
  const analysisResults = ref([])
  const settings = ref({
    sensitivity: 'medium',
    autoModeration: true,
    notifications: true
  })
  const loading = ref(false)

  // Getters
  const totalDetected = computed(() => detectedTweets.value.length)
  const highRiskTweets = computed(() => 
    detectedTweets.value.filter(tweet => tweet.riskLevel === 'high')
  )
  const moderateRiskTweets = computed(() => 
    detectedTweets.value.filter(tweet => tweet.riskLevel === 'moderate')
  )

  // Actions
  const analyzeTweet = async (tweetContent) => {
    loading.value = true
    try {
      const config = useRuntimeConfig()
      const response = await $fetch(`${config.public.apiBase}/ai/detect`, {
        method: 'POST',
        body: {
          word: tweetContent,
          settings: settings.value
        }
      })
      
      const result = {
        id: Date.now(),
        content: tweetContent,
        riskLevel: response.riskLevel,
        confidence: response.confidence,
        categories: response.categories,
        timestamp: new Date()
      }
      
      detectedTweets.value.unshift(result)
      return result
    } catch (error) {
      console.error('Error analyzing tweet:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateSettings = (newSettings) => {
    settings.value = { ...settings.value, ...newSettings }
  }

  const removeDetection = (detectionId) => {
    const index = detectedTweets.value.findIndex(d => d.id === detectionId)
    if (index > -1) {
      detectedTweets.value.splice(index, 1)
    }
  }

  const clearAllDetections = () => {
    detectedTweets.value = []
  }

  return {
    // State
    detectedTweets,
    analysisResults,
    settings,
    loading,
    
    // Getters
    totalDetected,
    highRiskTweets,
    moderateRiskTweets,
    
    // Actions
    analyzeTweet,
    updateSettings,
    removeDetection,
    clearAllDetections
  }
})
