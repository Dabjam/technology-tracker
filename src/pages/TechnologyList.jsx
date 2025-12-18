import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import TechnologyCard from '../components/TechnologyCard';
import RoadmapImporter from '../components/RoadmapImporter';
import SearchWithDebounce from '../components/SearchWithDebounce'; 
import FilterControls from '../components/FilterControls';
import QuickActions from '../components/QuickActions';

function TechnologyList() {
    const { 
        technologies, 
        loading, 
        error, 
        addTechnology, 
        deleteTechnology, // Теперь используем!
        batchAddTechnologies,
        markAllCompleted,
        resetAllStatuses
    } = useTechnologiesApi();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Исправлено: теперь функция не пустая
    const handleDelete = (id) => {
        deleteTechnology(id);
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
                (tech.description || '').toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        return currentList;
    }, [technologies, activeFilter, searchTerm]);

    if (loading) return <div className="loading-state">Загрузка технологий...</div>;
    if (error) return <div className="error-state">Ошибка: {error}</div>;

    return (
        <div className="technology-list-page">
            <div className="list-header-actions">
                <SearchWithDebounce 
                    onSearchChange={setSearchTerm} 
                    resultsCount={filteredTechnologies.length}
                    totalCount={technologies.length}
                />
                <FilterControls 
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </div>
            
            <div className="quick-actions-and-import-container">
                <QuickActions 
                    onMarkAllCompleted={markAllCompleted}
                    onResetAllStatuses={resetAllStatuses}
                />
                <RoadmapImporter 
                    addTechnology={addTechnology}
                    batchAddTechnologies={batchAddTechnologies}
                />
            </div>

            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard 
                        key={tech.id} 
                        tech={tech}
                        onDelete={handleDelete} // Передаем исправленную функцию
                    />
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <Link to="/add" className="btn btn-info">Добавить технологию</Link>
                </div>
            )}
        </div>
    );
}

export default TechnologyList;