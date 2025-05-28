import React, { useState, useEffect } from 'react';
import './TaskRollover.css';

const TaskRollover = ({ tasks, onRollover }) => {
  const [showModal, setShowModal] = useState(false);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    // Check for incomplete tasks at the end of the day
    const checkIncompleteTasks = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      
      if (now >= endOfDay) {
        const incomplete = tasks.filter(task => !task.completed);
        if (incomplete.length > 0) {
          setIncompleteTasks(incomplete);
          setShowModal(true);
        }
      }
    };

    // Check every hour
    const interval = setInterval(checkIncompleteTasks, 3600000);
    checkIncompleteTasks(); // Initial check

    return () => clearInterval(interval);
  }, [tasks]);

  const handleRollover = () => {
    onRollover(incompleteTasks);
    setShowModal(false);
  };

  const handleSkip = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="task-rollover-modal">
      <div className="modal-content">
        <h2>Tamamlanmamış Görevler</h2>
        <p>Bugün tamamlanmamış {incompleteTasks.length} görev var. Bunları yarına aktarmak ister misiniz?</p>
        <ul>
          {incompleteTasks.map(task => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={handleRollover} className="rollover-button">
            Yarına Aktar
          </button>
          <button onClick={handleSkip} className="skip-button">
            Atla
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskRollover; 