import React, { useState, useEffect } from 'react';
import './HabitTracker.css';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    // Save habits to localStorage
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      const habit = {
        id: Date.now(),
        name: newHabit,
        streak: 0,
        lastCompleted: null,
        history: []
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const toggleHabit = (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const lastCompleted = habit.lastCompleted;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = habit.streak;
        if (lastCompleted === yesterdayStr) {
          newStreak += 1;
        } else if (lastCompleted !== today) {
          newStreak = 1;
        }

        return {
          ...habit,
          streak: newStreak,
          lastCompleted: today,
          history: [...habit.history, today]
        };
      }
      return habit;
    }));
  };

  const removeHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const getHabitStatus = (habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.history.includes(today);
  };

  return (
    <div className="habit-tracker">
      <h2>Alışkanlık Takibi</h2>
      <div className="add-habit">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Yeni alışkanlık ekle..."
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <button onClick={addHabit}>Ekle</button>
      </div>
      <div className="habits-list">
        {habits.map(habit => (
          <div key={habit.id} className="habit-item">
            <div className="habit-info">
              <span className="habit-name">{habit.name}</span>
              <span className="habit-streak">🔥 {habit.streak} gün</span>
            </div>
            <div className="habit-actions">
              <button
                className={`complete-button ${getHabitStatus(habit) ? 'completed' : ''}`}
                onClick={() => toggleHabit(habit.id)}
              >
                {getHabitStatus(habit) ? '✓' : 'Tamamla'}
              </button>
              <button
                className="remove-button"
                onClick={() => removeHabit(habit.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker; 