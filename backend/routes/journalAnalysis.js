const express = require('express');
const router = express.Router();
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Analyze journal entries
router.post('/analyze', async (req, res) => {
  try {
    const { entries } = req.body;
    
    // Analyze mood trends
    const moodTrend = analyzeMoodTrend(entries);
    
    // Analyze habits
    const habits = analyzeHabits(entries);
    
    // Generate insights
    const insights = generateInsights(entries);
    
    // Generate recommendations
    const recommendations = generateRecommendations(entries, habits);

    res.json({
      moodTrend,
      habits,
      insights,
      recommendations
    });
  } catch (error) {
    console.error('Journal Analysis Error:', error);
    res.status(500).json({ error: 'Journal analysis failed' });
  }
});

// Helper function to analyze mood trends
function analyzeMoodTrend(entries) {
  const moodKeywords = {
    positive: ['mutlu', 'harika', 'güzel', 'sevindim', 'başarılı'],
    negative: ['üzgün', 'kötü', 'zor', 'stresli', 'endişeli'],
    neutral: ['normal', 'sıradan', 'fena değil', 'idare eder']
  };

  return entries.map(entry => {
    const tokens = tokenizer.tokenize(entry.text.toLowerCase());
    let moodScore = 0;
    
    tokens.forEach(token => {
      if (moodKeywords.positive.includes(token)) moodScore += 1;
      if (moodKeywords.negative.includes(token)) moodScore -= 1;
    });

    const normalizedScore = Math.max(-1, Math.min(1, moodScore / 5));
    
    return {
      date: entry.date,
      value: (normalizedScore + 1) / 2, // Normalize to 0-1 range
      label: getMoodLabel(normalizedScore)
    };
  });
}

// Helper function to analyze habits
function analyzeHabits(entries) {
  const habits = {};
  
  entries.forEach(entry => {
    const tokens = tokenizer.tokenize(entry.text.toLowerCase());
    tokens.forEach(token => {
      if (token.length > 3) { // Ignore short words
        habits[token] = (habits[token] || 0) + 1;
      }
    });
  });

  return Object.entries(habits)
    .filter(([_, count]) => count > 2) // Only include frequently mentioned habits
    .map(([name, count]) => ({
      name,
      streak: count,
      feedback: generateHabitFeedback(name, count)
    }));
}

// Helper function to generate insights
function generateInsights(entries) {
  const insights = [];
  
  // Analyze writing patterns
  const avgLength = entries.reduce((sum, entry) => sum + entry.text.length, 0) / entries.length;
  if (avgLength > 500) {
    insights.push('Journal yazılarınız oldukça detaylı ve düşünceli.');
  }

  // Analyze consistency
  const dates = entries.map(e => new Date(e.date));
  const consistency = calculateConsistency(dates);
  if (consistency > 0.8) {
    insights.push('Journal tutma konusunda çok tutarlısınız!');
  }

  return insights;
}

// Helper function to generate recommendations
function generateRecommendations(entries, habits) {
  const recommendations = [];
  
  // Check for negative patterns
  const negativeCount = entries.filter(e => 
    e.text.toLowerCase().includes('zor') || 
    e.text.toLowerCase().includes('stres')
  ).length;

  if (negativeCount > entries.length * 0.3) {
    recommendations.push('Stres seviyeniz yüksek görünüyor. Meditasyon veya egzersiz yapmayı deneyebilirsiniz.');
  }

  // Check for habit consistency
  habits.forEach(habit => {
    if (habit.streak < 3) {
      recommendations.push(`${habit.name} alışkanlığınızı daha sık tekrarlamayı deneyebilirsiniz.`);
    }
  });

  return recommendations;
}

// Helper function to get mood label
function getMoodLabel(score) {
  if (score > 0.3) return 'Pozitif';
  if (score < -0.3) return 'Negatif';
  return 'Nötr';
}

// Helper function to generate habit feedback
function generateHabitFeedback(name, count) {
  if (count > 5) return 'Bu alışkanlığı çok iyi sürdürüyorsunuz!';
  if (count > 3) return 'Bu alışkanlığı iyi sürdürüyorsunuz.';
  return 'Bu alışkanlığı geliştirmeye devam edin.';
}

// Helper function to calculate consistency
function calculateConsistency(dates) {
  if (dates.length < 2) return 0;
  
  const sortedDates = dates.sort((a, b) => a - b);
  const gaps = [];
  
  for (let i = 1; i < sortedDates.length; i++) {
    const gap = (sortedDates[i] - sortedDates[i-1]) / (1000 * 60 * 60 * 24);
    gaps.push(gap);
  }
  
  const avgGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
  return Math.max(0, 1 - (avgGap / 7)); // Normalize to 0-1 range
}

module.exports = router; 