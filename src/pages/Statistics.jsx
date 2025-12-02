// src/pages/Statistics.jsx

import React from 'react';

function Statistics({ technologies }) {
    // Простой расчет статистики для графика
    const totalCount = technologies.length;
    const completedCount = technologies.filter(t => t.status === 'completed').length;
    const inProgressCount = technologies.filter(t => t.status === 'in-progress').length;
    const notStartedCount = totalCount - completedCount - inProgressCount;
    
    // Данные для отображения (простой список, так как график требует установки библиотек)
    const stats = [
        { label: 'Всего технологий', count: totalCount, color: '#4a90e2' },
        { label: 'Выполнено', count: completedCount, color: '#50e3c2' },
        { label: 'В процессе', count: inProgressCount, color: '#f5a623' },
        { label: 'Не начато', count: notStartedCount, color: '#d0021b' },
    ];

    return (
        <div className="page-container">
            <h1>📊 Статистика прогресса</h1>
            <div className="stats-grid">
                {stats.map(stat => (
                    <div key={stat.label} className="stat-card" style={{ borderColor: stat.color }}>
                        <h3>{stat.label}</h3>
                        <p style={{ color: stat.color }}>{stat.count}</p>
                    </div>
                ))}
            </div>
            
            <p className="note">
                {/* * Для отрисовки полноценного графика (диаграммы) требуется установка библиотек, например, Recharts или Chart.js. Здесь представлен простой отчет. */}
            </p>
        </div>
    );
}

export default Statistics;