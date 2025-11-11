<template>
  <div class="w-64 h-screen bg-black flex flex-col px-4 py-2">
    <!-- X Logo -->
    <div class="mb-8">
      <NuxtLink to="/" class="block p-3 w-12 h-12 hover:bg-gray-800 rounded-full transition-colors">
        <Icons class="w-6 h-6 text-white" icon="twitter" />
      </NuxtLink>
    </div>
    
    <!-- Navigation Links -->
    <SideBarLeftLists />
    
    <!-- Post Button -->
    <div class="mt-6">
      <button class="w-full bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors">
        Post
      </button>
    </div>
    
    <!-- User Profile Section -->
    <div class="mt-auto mb-4">
      <div class="flex items-center p-3 hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
        <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-bold text-sm">E</span>
        </div>
        <div class="flex-1">
          <div class="text-white font-medium text-sm">Adebayo</div>
          <div class="text-gray-500 text-sm">@IssacAdebayo</div>
        </div>
        <Icons icon="more" class="w-5 h-5 text-gray-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic
</script>
