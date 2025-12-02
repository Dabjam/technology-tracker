// src/pages/Statistics.jsx

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

function Statistics({ technologies }) {
    // Расчет статистики
    const totalCount = technologies.length;
    const completedCount = technologies.filter(t => t.status === 'completed').length;
    const inProgressCount = technologies.filter(t => t.status === 'in-progress').length;
    const notStartedCount = totalCount - completedCount - inProgressCount;
    
    // Данные для отображения
    const stats = [
        { label: 'Всего технологий', count: totalCount, color: 'primary' },
        { label: 'Выполнено', count: completedCount, color: 'success' },
        { label: 'В процессе', count: inProgressCount, color: 'warning' },
        { label: 'Не начато', count: notStartedCount, color: 'error' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                📊 Статистика прогресса
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {stats.map(stat => (
                    <Grid item xs={12} sm={6} md={3} key={stat.label}>
                        <Paper 
                            elevation={3} 
                            sx={{ p: 3, textAlign: 'center', borderLeft: `5px solid`, borderColor: `${stat.color}.main` }}
                        >
                            <Typography variant="h6">{stat.label}</Typography>
                            <Typography variant="h3" color={`${stat.color}.main`} sx={{ fontWeight: 'bold' }}>
                                {stat.count}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            
            <Typography variant="caption" sx={{ mt: 3, display: 'block' }} color="text.secondary">
                * Для отрисовки полноценного графика (диаграммы) требуется установка специализированных библиотек.
            </Typography>
        </Box>
    );
}

export default Statistics;