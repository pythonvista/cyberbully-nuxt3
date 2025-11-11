<template>
  <div class="bg-black min-h-screen">
    <NuxtRouteAnnouncer />
    <div v-if="!login" class="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <p class="text-xl font-medium mb-2">Final Year Defense Project</p>
      <p class="text-xl font-medium mb-8">Dynamic CyberBullying Detection System</p>
      <button 
        @click="login = true" 
        class="bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-full transition-colors"
      >
        Get Started
      </button>
    </div>
    <div v-else class="flex min-h-screen">
      <SideBarLeft />
      <NuxtPage class="flex-auto max-w-2xl border-x border-gray-800" />
      <SideBarRight />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const login = ref(false)
</script>

<style>
/* Global styles */
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>