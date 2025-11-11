// Quotes database for tweet generation
// Categorized by type for cyberbullying detection demonstration

export const quotes = {
  normal: [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { content: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { content: "You learn more from failure than from success.", author: "Unknown" },
    { content: "If you are working on something exciting that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
    { content: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
    { content: "We cannot solve problems with the kind of thinking we employed when we came up with them.", author: "Albert Einstein" },
    { content: "Learn as if you will live forever, live like you will die tomorrow.", author: "Mahatma Gandhi" },
    { content: "Stay away from those people who try to disparage your ambitions.", author: "Mark Twain" },
    { content: "When you give joy to other people, you get more joy in return.", author: "Eleanor Roosevelt" },
    { content: "When you change your thoughts, remember to also change your world.", author: "Norman Vincent Peale" },
    { content: "It is only when we take chances, when our lives improve.", author: "Unknown" },
    { content: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { content: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { content: "You learn more from failure than from success.", author: "Unknown" }
  ],
  
  bullying: [
    { content: "You're so stupid, you can't do anything right.", author: "Unknown" },
    { content: "Nobody likes you, you should just disappear.", author: "Unknown" },
    { content: "You're such a loser, why do you even try?", author: "Unknown" },
    { content: "Everyone thinks you're annoying and worthless.", author: "Unknown" },
    { content: "You're too ugly to be seen in public.", author: "Unknown" },
    { content: "Why are you so pathetic? Get a life.", author: "Unknown" },
    { content: "You're the worst person I've ever met.", author: "Unknown" },
    { content: "Nobody wants you here, just leave.", author: "Unknown" },
    { content: "You're so dumb, you don't deserve to be here.", author: "Unknown" },
    { content: "Everyone laughs at you behind your back.", author: "Unknown" },
    { content: "You're a failure and always will be.", author: "Unknown" },
    { content: "You're so annoying, nobody can stand you.", author: "Unknown" },
    { content: "You're worthless and should just give up.", author: "Unknown" },
    { content: "You're so weird, no one will ever like you.", author: "Unknown" },
    { content: "You're the most useless person I know.", author: "Unknown" }
  ],
  
  racist: [
    { content: "People from that country are all criminals.", author: "Unknown" },
    { content: "Those people are inferior and don't belong here.", author: "Unknown" },
    { content: "All people of that race are the same and untrustworthy.", author: "Unknown" },
    { content: "They should go back to where they came from.", author: "Unknown" },
    { content: "People like them are a problem for our society.", author: "Unknown" },
    { content: "They don't deserve the same rights as us.", author: "Unknown" },
    { content: "Those people are all lazy and dishonest.", author: "Unknown" },
    { content: "We don't need more of them in our country.", author: "Unknown" },
    { content: "They're all the same and can't be trusted.", author: "Unknown" },
    { content: "People from that background are naturally inferior.", author: "Unknown" }
  ],
  
  sexist: [
    { content: "Women belong in the kitchen, not in the workplace.", author: "Unknown" },
    { content: "Girls can't do math or science as well as boys.", author: "Unknown" },
    { content: "Women are too emotional to be leaders.", author: "Unknown" },
    { content: "Men are naturally superior to women in every way.", author: "Unknown" },
    { content: "Women should just stay home and take care of the house.", author: "Unknown" },
    { content: "Girls are weak and can't handle real work.", author: "Unknown" },
    { content: "Women don't deserve equal pay because they're less capable.", author: "Unknown" },
    { content: "Females are only good for one thing.", author: "Unknown" },
    { content: "Women are too irrational to make important decisions.", author: "Unknown" },
    { content: "Men should make all the important choices, women can't be trusted.", author: "Unknown" },
    { content: "Girls are not as smart as boys, it's just biology.", author: "Unknown" },
    { content: "Women belong to men and should do what they're told.", author: "Unknown" }
  ]
}

// Get a random quote by category
export const getRandomQuote = (category = null) => {
  if (category && quotes[category]) {
    const categoryQuotes = quotes[category]
    const quote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
    return { ...quote, category }
  }
  
  // Get random quote from all categories
  const categories = Object.keys(quotes)
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const categoryQuotes = quotes[randomCategory]
  const quote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
  return { ...quote, category: randomCategory }
}

// Get random quote from a specific category
export const getRandomQuoteByCategory = (category) => {
  if (quotes[category] && quotes[category].length > 0) {
    const categoryQuotes = quotes[category]
    const quote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
    return { ...quote, category }
  }
  return getRandomQuote('normal')
}

// Get all categories
export const getCategories = () => {
  return Object.keys(quotes)
}

// Get weighted random quote (more normal quotes, fewer harmful ones)
export const getWeightedRandomQuote = () => {
  const weights = {
    normal: 0.6,      // 60% normal
    bullying: 0.15,   // 15% bullying
    racist: 0.125,    // 12.5% racist
    sexist: 0.125     // 12.5% sexist
  }
  
  const random = Math.random()
  let cumulative = 0
  
  for (const [category, weight] of Object.entries(weights)) {
    cumulative += weight
    if (random <= cumulative) {
      return getRandomQuoteByCategory(category)
    }
  }
  
  return getRandomQuoteByCategory('normal')
}

