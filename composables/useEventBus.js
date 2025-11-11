export const useEventBus = (eventName) => {
  const eventBus = useNuxtApp().$eventBus || new EventTarget()
  
  const emit = (data) => {
    eventBus.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }
  
  const on = (callback) => {
    const handler = (event) => callback(event.detail)
    eventBus.addEventListener(eventName, handler)
    
    // Return cleanup function
    return () => eventBus.removeEventListener(eventName, handler)
  }
  
  return {
    emit,
    on
  }
}
