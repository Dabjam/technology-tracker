// src/pages/Settings.jsx

import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function Settings({ onResetAllStatuses }) {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                ⚙️ Настройки приложения
            </Typography>
            
            <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Управление данными
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WarningIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                        Действия в этом разделе необратимы.
                    </Typography>
                </Box>
                
                <Button 
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={() => {
                        if (window.confirm("Вы уверены? Это сбросит все статусы технологий в состояние 'Не начато'!")) {
                            onResetAllStatuses();
                        }
                    }}
                    aria-label="Сбросить прогресс всех технологий"
                >
                    Сбросить все статусы
                </Button>
                
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    * Все ваши достижения будут обнулены.
                </Typography>
            </Paper>
        </Box>
    );
}

export default Settings;    