<template>
  <div class="bg-gray-800 rounded-3xl p-3 mb-4">
    <div class="flex items-center">
      <Icons icon="search" class="w-5 h-5" />
      <input 
        type="text" 
        placeholder="Search" 
        v-model="searchQuery"
        class="border-none bg-transparent outline-none ml-3 text-sm w-full placeholder-gray-400 text-white"
      />
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
</script>
