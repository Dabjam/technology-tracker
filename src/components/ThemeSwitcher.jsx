// src/components/ThemeSwitcher.jsx

import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeSwitcher({ mode, toggleColorMode }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
            <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                {mode === 'light' ? 'Светлая' : 'Тёмная'} тема
            </Typography>
            <IconButton 
                sx={{ ml: 1 }} 
                onClick={toggleColorMode} 
                color="inherit"
                aria-label={`Переключить на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
            >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

export default ThemeSwitcher;