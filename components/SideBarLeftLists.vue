<template>
  <div class="flex-1">
    <ul class="list-none p-0 m-0">
      <li class="mb-1">
        <NuxtLink to="/" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="home" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Home</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/explore" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="explore" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Explore</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/notifications" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <div class="relative mr-4">
            <Icons icon="notification" class="w-6 h-6" />
            <div class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-xs font-bold">3</span>
            </div>
          </div>
          <span class="font-medium text-xl">Notifications</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/messages" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="message" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Messages</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/bookmarks" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="bookmark" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Bookmarks</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/lists" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="list" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Lists</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/profile" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="profile" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">Profile</span>
        </NuxtLink>
      </li>
      <li class="mb-1">
        <NuxtLink to="/more" class="flex items-center p-3 text-white no-underline rounded-full hover:bg-gray-800 transition-colors group">
          <Icons icon="more" class="w-6 h-6 mr-4" />
          <span class="font-medium text-xl">More</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Component logic
</script>
