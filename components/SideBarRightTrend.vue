<template>
  <div class="bg-gray-800 rounded-2xl p-4 mb-4">
    <h3 class="text-xl font-extrabold text-white mb-4">What's happening</h3>
    <div 
      class="py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 last:border-b-0" 
      v-for="trend in trends" 
      :key="trend.id"
    >
      <div class="text-xs text-gray-400 mb-1">{{ trend.category }}</div>
      <div class="text-sm font-bold text-white mb-1">{{ trend.topic }}</div>
      <div class="text-xs text-gray-400">{{ trend.tweets }} Tweets</div>
    </div>
  </div>
</template>

<script setup>
const trends = ref([
  { id: 1, category: 'Technology', topic: '#CyberbullyingDetection', tweets: '12.5K' },
  { id: 2, category: 'Education', topic: '#OnlineSafety', tweets: '8.2K' },
  { id: 3, category: 'AI', topic: '#MachineLearning', tweets: '15.7K' },
  { id: 4, category: 'Social Media', topic: '#DigitalWellbeing', tweets: '6.9K' }
])
</script>
