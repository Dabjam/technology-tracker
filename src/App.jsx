import React, { useState, useMemo, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import SearchInput from './components/SearchInput'; 
import TechnologyModal from './components/TechnologyModal'; 
import ExportActions from './components/ExportActions'; 
import { INITIAL_DATA } from './data/initialData';

const LOCAL_STORAGE_KEY = 'techTrackerData'; 

const getUniqueTechnologies = (data) => {
    const seen = new Set();
    return data.filter(tech => {
        const isDuplicate = seen.has(tech.id);
        seen.add(tech.id);
        return !isDuplicate;
    });
};


function App() {
    const [technologies, setTechnologies] = useState(() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                return getUniqueTechnologies(parsedData);
            } catch (error) {
                console.error("Ошибка парсинга localStorage, используем INITIAL_DATA:", error);
                return getUniqueTechnologies(INITIAL_DATA);
            }
        }
        return getUniqueTechnologies(INITIAL_DATA);
    });
    
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTechId, setSelectedTechId] = useState(null);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(technologies));
    }, [technologies]);

    const handleCardClick = (techId) => {
        setSelectedTechId(techId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTechId(null);
    };

    const selectedTechnology = useMemo(() => {
        return technologies.find(tech => tech.id === selectedTechId);
    }, [technologies, selectedTechId]);

    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => {
                if (tech.id === techId) {
                    return { ...tech, notes: newNotes };
                }
                return tech;
            })
        );
    };

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

    const handleFilterChange = (filterValue) => {
        setActiveFilter(filterValue);
    };

    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const filteredTechnologies = useMemo(() => { 
        let currentList = technologies;

        if (activeFilter !== 'all') {
            currentList = currentList.filter(tech => tech.status === activeFilter);
        }

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentList = currentList.filter(tech => 
                (tech.title || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                (tech.description || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                (tech.notes || '').toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        return currentList; 

    }, [technologies, activeFilter, searchTerm]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Практика 21-22: Трекер изучения технологий с заметками, поиском и экспортом</h1>
                
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
                        onSelectRandom={selectRandomNext}
                    />
                    <FilterControls 
                        activeFilter={activeFilter}
                        onFilterChange={handleFilterChange}
                    />
                    <ExportActions
                        technologies={technologies}
                    />
                </section>
                
                <section className="controls-section">
                    <SearchInput
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        resultsCount={filteredTechnologies.length}
                        totalCount={totalCount}
                    />
                </section>

                <section className="technology-list-section">
                    <h2 className="section-title">
                        Список технологий ({filteredTechnologies.length})
                    </h2>
                    <div className="technology-list">
                        {filteredTechnologies.map(tech => (
                            <TechnologyCard 
                                key={tech.id} 
                                tech={tech} 
                                onToggleStatus={toggleTechnologyStatus} 
                                onCardClick={handleCardClick} а
                            />
                        ))}
                    </div>
                    {filteredTechnologies.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '20px' }}>
                            По вашему запросу и/или фильтру технологий не найдено.
                        </p>
                    )}
                </section>
            </main>
            {isModalOpen && selectedTechnology && (
                <TechnologyModal
                    tech={selectedTechnology}
                    onClose={closeModal}
                    onUpdateNotes={updateTechnologyNotes}
                    onToggleStatus={toggleTechnologyStatus}
                />
            )}
        </div>
    );
}

export default App;