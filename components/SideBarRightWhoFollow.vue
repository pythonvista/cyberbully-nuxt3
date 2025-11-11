<template>
  <div class="bg-gray-800 rounded-2xl p-4 mb-4">
    <h3 class="text-xl font-extrabold text-white mb-4">Who to follow</h3>
    <div class="flex items-center py-3 border-b border-gray-700 last:border-b-0" v-for="user in suggestedUsers" :key="user.id">
      <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full mr-3" />
      <div class="flex-1">
        <div class="text-sm font-bold text-white mb-1">{{ user.name }}</div>
        <div class="text-sm text-gray-400">@{{ user.username }}</div>
      </div>
      <button class="bg-white text-black border-none rounded-2xl px-4 py-2 font-bold cursor-pointer hover:bg-gray-200 transition-colors">
        Follow
      </button>
    </div>
  </div>
</template>

<script setup>
const suggestedUsers = ref([
  { id: 1, name: 'AI Research Lab', username: 'ai_research', avatar: 'https://via.placeholder.com/48' },
  { id: 2, name: 'Cyber Safety', username: 'cybersafety', avatar: 'https://via.placeholder.com/48' },
  { id: 3, name: 'Tech Education', username: 'techedu', avatar: 'https://via.placeholder.com/48' }
])
</script>
