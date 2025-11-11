<template>
  <div v-if="icon === 'twitter'" :class="iconClasses" class="inline-block">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="w-full h-full fill-current">
      <g>
        <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
      </g>
    </svg>
  </div>
  <div v-else :class="iconClasses" class="inline-block">
    <div :class="iconShapeClasses" class="w-full h-full"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '6'
  }
})

const iconClasses = computed(() => {
  const baseClasses = `w-${props.size} h-${props.size}`
  return baseClasses
})

const iconShapeClasses = computed(() => {
  const iconStyles = {
    home: 'bg-white',
    explore: 'bg-white rounded-full',
    notification: 'bg-white rounded-full',
    message: 'bg-white rounded',
    bookmark: 'bg-white',
    list: 'bg-white rounded-sm',
    profile: 'bg-white rounded-full',
    more: 'bg-white rounded-full',
    search: 'bg-gray-400 rounded-full',
    image: 'bg-green-500 rounded',
    gif: 'bg-blue-500 rounded',
    smiley: 'bg-yellow-400 rounded-full',
    comment: 'bg-gray-400 rounded',
    retweet: 'bg-green-500 rounded',
    like: 'bg-red-500 rounded-full',
    share: 'bg-gray-400 rounded'
  }
  
  return iconStyles[props.icon] || 'bg-gray-500 rounded'
})
</script>
