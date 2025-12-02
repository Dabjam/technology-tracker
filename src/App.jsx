// src/App.jsx

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import Header from './components/Header';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import SearchInput from './components/SearchInput';
import NotificationSnackbar from './components/NotificationSnackbar'; // Пр. 26
import BulkEditForm from './components/BulkEditForm'; // Пр. 25
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

import { INITIAL_DATA } from './data/initialData';
import { useDebounce } from './utils/hooks'; 

// Имитация данных API
const API_MOCK_DATA = [
    { id: 7, title: 'GraphQL', status: 'not-started', category: 'Backend', description: 'Язык запросов для API.' },
    { id: 8, title: 'AWS Basics', status: 'not-started', category: 'DevOps', description: 'Основы облачных вычислений Amazon.' },
];

// Функция для чтения темы из localStorage
const getInitialMode = () => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
};

function App() {
    // --- Состояния UI/API ---
    const [technologies, setTechnologies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState([]); // Для массового редактирования (Пр. 25)
    
    // --- Состояние темы (Пр. 26) ---
    const [mode, setMode] = useState(getInitialMode);

    // --- Состояние уведомлений (Пр. 26) ---
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: 'info',
        duration: 6000
    });

    // --- Логика Уведомлений ---
    const showNotification = useCallback((message, type = 'info', duration = 6000) => {
        setNotification({ open: true, message, type, duration });
    }, []);

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    // --- Логика Тема ---
    const toggleColorMode = useCallback(() => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
        showNotification(`Тема переключена на ${mode === 'light' ? 'тёмную' : 'светлую'}`, 'info', 3000);
    }, [mode, showNotification]);

    // Создание темы MUI (Пр. 26)
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#4a90e2',
                    },
                    secondary: {
                        main: '#f5a623',
                    },
                },
            }),
        [mode],
    );

    // --- Загрузка данных (Пр. 24) ---
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            try {
                const mergedData = [...INITIAL_DATA, ...API_MOCK_DATA].map(t => ({...t, id: t.id || Date.now() + Math.random()})); // Гарантия уникального ID
                setTechnologies(mergedData);
                showNotification('Данные успешно загружены.', 'success', 3000);
                setIsLoading(false);
            } catch (err) {
                setError("Ошибка загрузки данных.");
                showNotification('Ошибка загрузки данных.', 'error');
                setIsLoading(false);
            }
        }, 1500); 

        return () => clearTimeout(timer);
    }, [showNotification]);

    // --- Debounce ---
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // --- Логика Действий ---
    const toggleTechnologyStatus = (techId) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => {
                if (tech.id === techId) {
                    let newStatus = '';
                    if (tech.status === 'not-started') newStatus = 'in-progress';
                    else if (tech.status === 'in-progress') newStatus = 'completed';
                    else newStatus = 'not-started';
                    showNotification(`Статус ${tech.title} изменен на ${newStatus}`, 'info', 2000);
                    return { ...tech, status: newStatus };
                }
                return tech;
            })
        );
    };

    const markAllCompleted = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'completed' }))); 
        showNotification('Все технологии отмечены как выполненные.', 'success');
    };
    
    const resetAllStatuses = () => { 
        setTechnologies(prevTech => prevTech.map(tech => ({ ...tech, status: 'not-started' }))); 
        showNotification('Все статусы сброшены.', 'warning');
    };

    // --- Массовое редактирование (Пр. 25) ---
    const handleSelectTech = (id) => {
        setSelectedIds(prevIds => 
            prevIds.includes(id) ? prevIds.filter(prevId => prevId !== id) : [...prevIds, id]
        );
    };

    const applyBulkStatus = (ids, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => (ids.includes(tech.id) ? { ...tech, status: newStatus } : tech))
        );
        showNotification(`Статус ${ids.length} технологий изменен на ${newStatus}.`, 'success');
        setSelectedIds([]);
    };

    // --- Импорт/Экспорт (Пр. 25) ---
    const handleExportData = () => { 
        try {
            const dataStr = JSON.stringify(technologies, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'technology_tracker_export.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showNotification('Данные экспортированы.', 'success');
        } catch (e) {
            showNotification('Ошибка при экспорте данных.', 'error');
        }
    };
    
    const handleImportData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                // Простая валидация: проверяем, что это массив объектов с нужными полями
                if (!Array.isArray(importedData) || importedData.some(t => !t.id || !t.title || !t.status)) {
                    throw new Error("Некорректный формат данных или отсутствует ID/Title/Status.");
                }
                setTechnologies(importedData);
                showNotification('Данные успешно импортированы.', 'success');
            } catch (error) {
                showNotification(`Ошибка импорта: ${error.message || 'Неверный формат JSON.'}`, 'error');
            }
        };
        reader.readAsText(file);
    };

    // --- Обработчики для Home.jsx ---
    const handleFilterChange = (val) => {
        setSearchQuery(''); 
        setActiveFilter(val);
    }
    const handleSearchChange = (val) => {
        setSearchQuery(val);
    }
    
    // --- Логика Фильтрации и Поиска ---
    const filteredResults = useMemo(() => {
        if (isLoading) return [];

        const filteredByStatus = technologies.filter(tech => {
            if (activeFilter === 'all') return true;
            return tech.status === activeFilter;
        });

        if (!debouncedSearchQuery) return filteredByStatus;

        const query = debouncedSearchQuery.toLowerCase();
        
        return filteredByStatus.filter(tech =>
            tech.title.toLowerCase().includes(query) ||
            (tech.description && tech.description.toLowerCase().includes(query))
        );
    }, [technologies, activeFilter, debouncedSearchQuery, isLoading]);

    // --- Расчет Прогресс-бара ---
    const completedCount = technologies.filter(tech => tech.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <Header 
                    progressPercentage={progressPercentage} 
                    mode={mode} 
                    toggleColorMode={toggleColorMode} 
                />
                
                <Box component="main" sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
                    <Routes>
                        <Route 
                            path="/" 
                            element={<Home 
                                isLoading={isLoading} 
                                error={error} 
                                technologies={technologies}
                                activeFilter={activeFilter}
                                searchQuery={searchQuery}
                                filteredResults={filteredResults}
                                onToggleStatus={toggleTechnologyStatus}
                                onFilterChange={handleFilterChange}
                                onSearchChange={handleSearchChange}
                                onMarkAllCompleted={markAllCompleted}
                                onResetAllStatuses={resetAllStatuses}
                                onExportData={handleExportData}
                                onImportData={handleImportData} // Импорт
                                
                                selectedIds={selectedIds} // Массовое редактирование
                                onSelectTech={handleSelectTech} 
                                applyBulkStatus={applyBulkStatus}
                                onClearSelection={() => setSelectedIds([])}
                            />} 
                        />
                        <Route path="/statistics" element={<Statistics technologies={technologies} />} />
                        <Route path="/settings" element={<Settings onResetAllStatuses={resetAllStatuses} />} />
                    </Routes>
                </Box>
                
                {/* Компонент уведомлений */}
                <NotificationSnackbar 
                    notification={notification} 
                    handleClose={handleCloseNotification}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;