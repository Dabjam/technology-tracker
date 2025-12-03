import React, { useState, useMemo } from 'react';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import { INITIAL_DATA } from './data/initialData';

function App() {
    const [technologies, setTechnologies] = useState(INITIAL_DATA);
    const [activeFilter, setActiveFilter] = useState('all');

    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // --- Логика переключения статуса по клику ---
    const toggleTechnologyStatus = (techId) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => {
                if (tech.id === techId) {
                    let newStatus = '';
                    // Циклическое переключение статусов: Not Started -> In Progress -> Completed -> Not Started
                    if (tech.status === 'not-started') newStatus = 'in-progress';
                    else if (tech.status === 'in-progress') newStatus = 'completed';
                    else newStatus = 'not-started';
                    return { ...tech, status: newStatus };
                }
                return tech;
            })
        );
    };

    // --- Логика Быстрых действий ---
    const markAllCompleted = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'completed' })));
    };

    const resetAllStatuses = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'not-started' })));
    };

    const selectRandomNext = () => { 
        const notCompleted = technologies.filter(tech => tech.status !== 'completed');
        if (notCompleted.length === 0) {
            alert('Все технологии изучены! Вы великолепны!');
            return;
        }
        const randomIndex = Math.floor(Math.random() * notCompleted.length);
        const randomTech = notCompleted[randomIndex];
        alert(`Ваша следующая цель: ${randomTech.title}!`);
    };

    // --- Логика Фильтрации ---
    const handleFilterChange = (filterValue) => {
        setActiveFilter(filterValue);
    };

    const filteredTechnologies = useMemo(() => { 
        if (activeFilter === 'all') {
            return technologies;
        }
        // Фильтрация по выбранному статусу
        return technologies.filter(tech => tech.status === activeFilter);
    }, [technologies, activeFilter]); 

    // --- РЕНДЕР ---
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Практика 20: Трекер изучения технологий</h1>
                
                <div className="progress-bar-container">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {/* Отображение процентов выполнения */}
                        {progressPercentage.toFixed(0)}%
                    </div> 
                </div>
            </header>
            
            <main className="main-content">
                <section className="controls-section">
                    <QuickActions 
                        onMarkAllCompleted={markAllCompleted}
                        onResetAllStatuses={resetAllStatuses}
                        onSelectRandom={selectRandomNext}
                    />
                    <FilterControls 
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterChange}
                    />
                </section>

                <section className="technology-list-section">
                    <h2 className="section-title">Список технологий ({filteredTechnologies.length})</h2>
                    <div className="technology-list">
                        {filteredTechnologies.map(tech => (
                            <TechnologyCard 
                                key={tech.id} 
                                tech={tech} 
                                onToggleStatus={toggleTechnologyStatus} 
                            />
                        ))}
                    </div>
                     {/* Сообщение, если фильтр не дал результатов */}
                    {filteredTechnologies.length === 0 && activeFilter !== 'all' && (
                        <p>Нет технологий со статусом "{activeFilter}"</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;