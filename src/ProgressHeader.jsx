import React from 'react';

function ProgressHeader({ technologies }) {
  const completedTechnologies = technologies.filter(tech => tech.status === 'done').length;
  const totalTechnologies = technologies.length;

  const completionPercentage = totalTechnologies === 0 
    ? 0 
    : Math.round((completedTechnologies / totalTechnologies) * 100);

  return (
    <div className="progress-header">
      <h2>Общая статистика прогресса 📊</h2>
      
      <div className="stats-info">
        <p>Всего технологий: <strong>{totalTechnologies}</strong></p>
        <p>Изучено: <strong>{completedTechnologies}</strong></p>
        <p>Прогресс: <strong>{completionPercentage}%</strong></p>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${completionPercentage}%` }}
        >
          {completionPercentage > 5 ? `${completionPercentage}%` : ''}
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;