// src/pages/Home.jsx

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import QuickActions from '../components/QuickActions';
import FilterControls from '../components/FilterControls';
import SearchInput from '../components/SearchInput';
import TechnologyCard from '../components/TechnologyCard';
import BulkEditForm from '../components/BulkEditForm'; // Импорт BulkEdit
import DeadlineForm from '../components/DeadlineForm'; // Импорт формы для Задания 1 Пр. 25

function Home({ 
    isLoading, error, technologies, activeFilter, 
    onToggleStatus, onFilterChange, searchQuery, 
    onSearchChange, filteredResults, onMarkAllCompleted, 
    onResetAllStatuses, onExportData, onImportData,
    
    selectedIds, onSelectTech, applyBulkStatus, onClearSelection
}) {
    
    const totalCount = technologies.length;

    if (isLoading) return <Box sx={{ p: 3 }}><Typography>⏳ Загрузка данных из API...</Typography></Box>;
    if (error) return <Box sx={{ p: 3 }}><Typography color="error">❌ Ошибка: {error}</Typography></Box>;

    return (
        <Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Секция 1: Действия и сроки */}
                <Grid item xs={12} md={4}>
                    <QuickActions 
                        onMarkAllCompleted={onMarkAllCompleted}
                        onResetAllStatuses={onResetAllStatuses}
                        onExportData={onExportData}
                        onImportData={onImportData}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* Задание 1: Форма для установки сроков (Mockup) */}
                    <DeadlineForm />
                </Grid>
            </Grid>

            {/* Задание 2: Форма массового редактирования (Пр. 25) */}
            <BulkEditForm
                selectedIds={selectedIds}
                applyBulkStatus={applyBulkStatus}
                onClearSelection={onClearSelection}
            />

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <FilterControls 
                        activeFilter={activeFilter}
                        onFilterChange={onFilterChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SearchInput 
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        resultCount={filteredResults.length}
                    />
                </Grid>
            </Grid>

            <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Список технологий ({filteredResults.length} из {totalCount})
                </Typography>
                <Grid container spacing={2}>
                    {filteredResults.map(tech => (
                        <Grid item xs={12} sm={6} md={4} key={tech.id}>
                            <TechnologyCard 
                                tech={tech} 
                                onToggleStatus={onToggleStatus} 
                                // Пропсы для массового редактирования
                                onSelect={onSelectTech} 
                                isSelected={selectedIds.includes(tech.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
                {filteredResults.length === 0 && (
                    <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                        Нет результатов, соответствующих критериям.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default Home;