<template>
  <div class="border-b border-gray-800 p-4 bg-black">
    <div class="flex gap-3">
      <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-sm">E</span>
      </div>
      <div class="flex-1">
        <textarea
          v-model="tweetContent"
          placeholder="What's happening?"
          class="w-full border-none outline-none resize-none text-xl leading-6 text-white bg-transparent min-h-6 max-h-48 placeholder-gray-500"
          @keydown.enter="handleTweet"
        ></textarea>
        <div class="flex justify-between items-center mt-3">
          <div class="flex gap-2">
            <button class="text-green-500 hover:bg-green-900 p-2 rounded-full transition-colors">
              <Icons icon="image" class="w-5 h-5" />
            </button>
            <button class="text-blue-500 hover:bg-blue-900 p-2 rounded-full transition-colors">
              <Icons icon="gif" class="w-5 h-5" />
            </button>
            <button class="text-yellow-400 hover:bg-yellow-900 p-2 rounded-full transition-colors">
              <Icons icon="smiley" class="w-5 h-5" />
            </button>
          </div>
          <button
            class="bg-white hover:bg-gray-200 text-black border-none rounded-full px-4 py-2 font-bold cursor-pointer transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            :disabled="!tweetContent.trim() || isAnalyzing"
            @click="handleTweet"
          >
            {{ isAnalyzing ? 'Analyzing...' : 'Post' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tweetContent = ref('')
const eventBus = useEventBus('tweet')
const cyberbullyStore = useCyberbullyStore()
const isAnalyzing = ref(false)

const appStore = useAppStore()

const handleTweet = async () => {
  if (tweetContent.value.trim() && !isAnalyzing.value) {
    isAnalyzing.value = true
    
    try {
      // Analyze the tweet for cyberbullying
      const analysisResult = await cyberbullyStore.analyzeTweet(tweetContent.value)
      
      const tweetId = Date.now()
      const tweet = {
        id: tweetId,
        content: tweetContent.value,
        timestamp: new Date(),
        author: 'Current User',
        analysis: analysisResult
      }
      
      // Add tweet to store
      appStore.addTweet(tweet)
      
      // Emit tweet event with analysis results
      eventBus.emit(tweet)
      
      // Clear textarea
      tweetContent.value = ''
    } catch (error) {
      console.error('Error analyzing tweet:', error)
      // Still emit the tweet even if analysis fails
      const tweetId = Date.now()
      const tweet = {
        id: tweetId,
        content: tweetContent.value,
        timestamp: new Date(),
        author: 'Current User',
        analysis: null
      }
      
      // Add tweet to store
      appStore.addTweet(tweet)
      
      // Emit tweet event
      eventBus.emit(tweet)
      tweetContent.value = ''
    } finally {
      isAnalyzing.value = false
    }
  }
}
</script>

