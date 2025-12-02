import React, { useState, useMemo } from 'react';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import SearchInput from './components/SearchInput';
import { INITIAL_DATA } from './data/initialData';

function App() {
    // 1. Состояние для списка технологий
    const [technologies, setTechnologies] = useState(INITIAL_DATA);
    // 2. Состояние для активного фильтра
    const [activeFilter, setActiveFilter] = useState('all');
    // 3. Состояние для поискового запроса
    const [searchQuery, setSearchQuery] = useState('');

    // --- Логика Практики 20: Переключение статуса по клику ---
    const toggleTechnologyStatus = (techId) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => {
                if (tech.id === techId) {
                    let newStatus = '';
                    if (tech.status === 'not-started') newStatus = 'in-progress';
                    else if (tech.status === 'in-progress') newStatus = 'completed';
                    else newStatus = 'not-started';
                    return { ...tech, status: newStatus };
                }
                return tech;
            })
        );
    };

    // --- Логика Массовых действий ---
    const markAllCompleted = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'completed' })));
    };

    const resetAllStatuses = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'not-started' })));
    };

    // --- Логика экспорта данных (Задание 22) ---
    const handleExportData = () => {
        // Преобразуем массив объектов в JSON-строку
        const dataStr = JSON.stringify(technologies, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        
        // Создаем временную ссылку для скачивания файла
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'technology_tracker_export.json';
        document.body.appendChild(a);
        a.click();
        
        // Очистка и уведомление
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Данные экспортированы в technology_tracker_export.json');
    };

    // --- Логика Объединенной Фильтрации (Статус + Поиск) ---
    const filteredResults = useMemo(() => {
        // 1. Фильтрация по статусу
        const filteredByStatus = technologies.filter(tech => {
            if (activeFilter === 'all') return true;
            return tech.status === activeFilter;
        });

        // 2. Фильтрация по поисковому запросу
        if (!searchQuery) return filteredByStatus;

        const query = searchQuery.toLowerCase();
        
        return filteredByStatus.filter(tech =>
            // Проверяем название
            tech.title.toLowerCase().includes(query) ||
            // Проверяем описание
            (tech.description && tech.description.toLowerCase().includes(query))
        );
    }, [technologies, activeFilter, searchQuery]); // Зависимости

    // --- Расчет Прогресс-бара ---
    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // --- РЕНДЕР ---
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Практика 21-22: Трекер изучения технологий</h1>
                
                <div className="progress-bar-container">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {progressPercentage.toFixed(0)}%
                    </div> 
                </div>
            </header>
            
            <main className="main-content">
                <section className="controls-section">
                    <QuickActions 
                        onMarkAllCompleted={markAllCompleted}
                        onResetAllStatuses={resetAllStatuses}
                        onExportData={handleExportData}
                    />
                    
                    <div className="filter-and-search">
                        <FilterControls 
                            activeFilter={activeFilter}
                            onFilterChange={(val) => {
                                // При смене фильтра сбрасываем поиск для лучшего UX
                                setSearchQuery(''); 
                                setActiveFilter(val);
                            }}
                        />
                        <SearchInput 
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            resultCount={filteredResults.length}
                        />
                    </div>
                </section>

                <section className="technology-list-section">
                    <h2 className="section-title">
                        Список технологий ({filteredResults.length} из {totalCount})
                    </h2>
                    <div className="technology-list">
                        {filteredResults.map(tech => (
                            <TechnologyCard 
                                key={tech.id} 
                                tech={tech} 
                                onToggleStatus={toggleTechnologyStatus} 
                            />
                        ))}
                    </div>
                    {filteredResults.length === 0 && (
                        <p className="no-results">
                            Нет результатов, соответствующих критериям.
                        </p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;