export const useApi = () => {
  const config = useRuntimeConfig()
  
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const analyzeText = async (text) => {
    try {
      return await api('/analyze', {
        method: 'POST',
        body: { text }
      })
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const getAnalysisHistory = async () => {
    try {
      return await api('/history')
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const updateSettings = async (settings) => {
    try {
      return await api('/settings', {
        method: 'PUT',
        body: settings
      })
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    analyzeText,
    getAnalysisHistory,
    updateSettings
  }
}
