<template>
  <div class="border-b border-gray-800 bg-black">
    <div class="flex justify-between p-4">
      <h3 class="font-black text-2xl text-white cursor-pointer">Home</h3>
      <Icons icon="more" class="w-6 h-6 text-white cursor-pointer" />
    </div>
    <ZoneTweet />
    <TweetUser :i="i" v-for="(i, index) in tweets" :key="index" />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
  </div>
</template>

<script setup>
const appStore = useAppStore()
const tweets = computed(() => appStore.tweets)
</script>

