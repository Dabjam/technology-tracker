// src/components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Box, LinearProgress, Tab, Tabs } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

function Header({ progressPercentage, mode, toggleColorMode }) {
    const location = useLocation();

    // Определяем текущий путь для активации Tab
    const currentPath = location.pathname === '/' ? '/' : location.pathname;

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Технологический трекер
                </Typography>
                
                <ThemeSwitcher mode={mode} toggleColorMode={toggleColorMode} />
            </Toolbar>
            
            {/* Навигация с использованием Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                <Tabs value={currentPath} aria-label="Основная навигация">
                    <Tab 
                        label="Главная" 
                        value="/" 
                        component={NavLink} 
                        to="/" 
                        sx={{ minWidth: 100 }}
                    />
                    <Tab 
                        label="Статистика" 
                        value="/statistics" 
                        component={NavLink} 
                        to="/statistics" 
                        sx={{ minWidth: 100 }}
                    />
                    <Tab 
                        label="Настройки" 
                        value="/settings" 
                        component={NavLink} 
                        to="/settings" 
                        sx={{ minWidth: 100 }}
                    />
                </Tabs>
            </Box>

            {/* Прогресс-бар MUI */}
            <Box sx={{ width: '100%', p: 1, pt: 0 }}>
                <Typography variant="caption" sx={{ display: 'block' }}>
                    Прогресс: {progressPercentage.toFixed(0)}%
                </Typography>
                <LinearProgress 
                    variant="determinate" 
                    value={progressPercentage} 
                    sx={{ height: 10, borderRadius: 5 }}
                    aria-label={`Прогресс изучения: ${progressPercentage.toFixed(0)} процентов`}
                />
            </Box>
        </AppBar>
    );
}

export default Header;