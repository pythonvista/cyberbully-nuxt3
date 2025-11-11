// Local cyberbullying detection based on content analysis
// This works offline and uses pattern matching and keyword detection

export const useCyberbullyDetection = () => {
  
  // Keyword patterns for different types of harmful content
  const patterns = {
    bullying: [
      /\b(stupid|idiot|loser|worthless|pathetic|useless|ugly|dumb|failure|hate|disgusting|annoying|nobody likes|everyone thinks|should disappear|just leave|give up)\b/gi,
      /you're so\s+(stupid|dumb|ugly|annoying|pathetic|worthless)/gi,
      /nobody\s+(likes|wants|can stand)/gi,
      /everyone\s+(thinks|knows|hates|laughs)/gi
    ],
    racist: [
      /\b(inferior|superior|race|ethnicity|nationality).*\b(all|they|those people|people from|people of)/gi,
      /(go back|don't belong|not welcome|our country|their country)/gi,
      /(all|every).*\b(criminals|lazy|dishonest|untrustworthy|problem)/gi,
      /(same|all the same|can't be trusted|naturally)/gi
    ],
    sexist: [
      /\b(women|girls|females|men|boys).*\b(kitchen|belong|should|can't|weak|emotional|irrational)/gi,
      /(women|girls).*\b(belong|should stay|can't do|too|not as|only good for)/gi,
      /(men|boys).*\b(superior|make decisions|should make|naturally)/gi,
      /(equal pay|deserve|capable|smart|biology|weak)/gi
    ]
  }

  // Analyze text content
  const analyzeText = (text) => {
    if (!text || typeof text !== 'string') {
      return {
        riskLevel: 'low',
        confidence: 0,
        categories: [],
        detectedCategories: []
      }
    }

    const detectedCategories = []
    let maxRiskLevel = 'low'
    let totalMatches = 0

    // Check for bullying
    const bullyingMatches = patterns.bullying.reduce((count, pattern) => {
      const matches = text.match(pattern)
      return count + (matches ? matches.length : 0)
    }, 0)
    
    if (bullyingMatches > 0) {
      detectedCategories.push('bullying')
      totalMatches += bullyingMatches
      if (bullyingMatches >= 2) maxRiskLevel = 'high'
      else if (maxRiskLevel === 'low') maxRiskLevel = 'moderate'
    }

    // Check for racism
    const racistMatches = patterns.racist.reduce((count, pattern) => {
      const matches = text.match(pattern)
      return count + (matches ? matches.length : 0)
    }, 0)
    
    if (racistMatches > 0) {
      detectedCategories.push('racist')
      totalMatches += racistMatches
      if (racistMatches >= 2) maxRiskLevel = 'high'
      else if (maxRiskLevel === 'low') maxRiskLevel = 'moderate'
    }

    // Check for sexism
    const sexistMatches = patterns.sexist.reduce((count, pattern) => {
      const matches = text.match(pattern)
      return count + (matches ? matches.length : 0)
    }, 0)
    
    if (sexistMatches > 0) {
      detectedCategories.push('sexist')
      totalMatches += sexistMatches
      if (sexistMatches >= 2) maxRiskLevel = 'high'
      else if (maxRiskLevel === 'low') maxRiskLevel = 'moderate'
    }

    // Calculate confidence based on matches
    let confidence = 0
    if (totalMatches === 0) {
      confidence = 0.1
      maxRiskLevel = 'low'
    } else if (totalMatches === 1) {
      confidence = 0.6
    } else if (totalMatches === 2) {
      confidence = 0.8
    } else {
      confidence = 0.95
      maxRiskLevel = 'high'
    }

    return {
      riskLevel: maxRiskLevel,
      confidence,
      categories: detectedCategories,
      detectedCategories
    }
  }

  // Analyze based on known category (faster and more accurate)
  const analyzeByCategory = (category, text = '') => {
    if (!category || category === 'normal') {
      return {
        riskLevel: 'low',
        confidence: 0.9,
        categories: [],
        detectedCategories: []
      }
    }

    // Map category to risk level and confidence
    const categoryMap = {
      bullying: {
        riskLevel: 'high',
        confidence: 0.95,
        categories: ['bullying'],
        detectedCategories: ['bullying']
      },
      racist: {
        riskLevel: 'high',
        confidence: 0.95,
        categories: ['racist'],
        detectedCategories: ['racist']
      },
      sexist: {
        riskLevel: 'high',
        confidence: 0.95,
        categories: ['sexist'],
        detectedCategories: ['sexist']
      }
    }

    // If category is known, use it directly (most reliable)
    if (categoryMap[category]) {
      return categoryMap[category]
    }

    // Fallback to text analysis if category doesn't match
    const textAnalysis = analyzeText(text)
    
    // If text analysis found something, use it; otherwise use category if it exists
    if (textAnalysis.categories.length > 0) {
      return textAnalysis
    }
    
    // Last resort: return low risk
    return {
      riskLevel: 'low',
      confidence: 0.5,
      categories: [],
      detectedCategories: []
    }
  }

  // Combined analysis (prefer category, fallback to text)
  const analyze = (text, category = null) => {
    if (category && category !== 'normal') {
      return analyzeByCategory(category, text)
    }
    return analyzeText(text)
  }

  return {
    analyze,
    analyzeText,
    analyzeByCategory
  }
}

