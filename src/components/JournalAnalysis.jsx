import React, { useState, useEffect } from 'react';
import './JournalAnalysis.css';

const JournalAnalysis = ({ journalEntries }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeJournal = async () => {
      try {
        const response = await fetch('/api/journal/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entries: journalEntries }),
        });
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Journal analysis error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (journalEntries.length > 0) {
      analyzeJournal();
    }
  }, [journalEntries]);

  if (loading) {
    return <div className="loading">Analiz ediliyor...</div>;
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="journal-analysis">
      <h2>Journal Analizi</h2>
      
      <div className="mood-analysis">
        <h3>Ruh Hali Analizi</h3>
        <div className="mood-chart">
          {analysis.moodTrend.map((mood, index) => (
            <div
              key={index}
              className="mood-bar"
              style={{ height: `${mood.value * 100}%` }}
              title={`${mood.date}: ${mood.label}`}
            />
          ))}
        </div>
      </div>

      <div className="habit-analysis">
        <h3>Alışkanlık Analizi</h3>
        <ul>
          {analysis.habits.map((habit, index) => (
            <li key={index}>
              <span className="habit-name">{habit.name}</span>
              <span className="habit-streak">🔥 {habit.streak} gün</span>
              <p className="habit-feedback">{habit.feedback}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="insights">
        <h3>Öngörüler</h3>
        <ul>
          {analysis.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="recommendations">
        <h3>Öneriler</h3>
        <ul>
          {analysis.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JournalAnalysis; 