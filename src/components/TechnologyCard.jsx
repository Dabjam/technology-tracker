import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Checkbox } from '@mui/material';

function TechnologyCard({ tech, onToggleStatus, onSelect, isSelected }) { 
    
    // --- Маппинг статусов для MUI Chip ---
    const statusMap = {
        'not-started': { label: 'Не начато', color: 'error' },
        'in-progress': { label: 'В процессе', color: 'warning' },
        'completed': { label: 'Выполнено', color: 'success' },
    };
    
    const statusInfo = statusMap[tech.status];

    return (
        <Card 
            sx={{ 
                // Установка цвета границы слева в зависимости от статуса
                borderLeft: `5px solid ${statusInfo.color ? statusInfo.color.main : '#ccc'}`,
                mb: 2, 
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                    boxShadow: 6,
                }
            }}
            aria-labelledby={`tech-title-${tech.id}`}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                
                {/* 1. Чекбокс для массового редактирования */}
                {onSelect && (
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onSelect(tech.id)}
                        inputProps={{ 'aria-label': `Выбрать ${tech.title}` }}
                        sx={{ p: 1 }}
                    />
                )}
                
                {/* 2. Основное содержимое карточки (кликабельно для смены статуса) */}
                <CardContent sx={{ flexGrow: 1 }} onClick={() => onToggleStatus(tech.id)}>
                    
                    {/* *** ВАЖНО: Отображение заголовка (title) *** */}
                    <Typography 
                        variant="h6" 
                        component="h3" 
                        id={`tech-title-${tech.id}`}
                        sx={{ mb: 1 }}
                    >
                        {tech.title} {/* <<< ЭТО ПОЛЕ ДОЛЖНО ОТОБРАЖАТЬСЯ! */}
                    </Typography>
                    
                    {/* Отображение категории */}
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Категория: {tech.category}
                    </Typography>

                    {/* MUI Chip для отображения статуса */}
                    <Chip 
                        label={statusInfo.label}
                        color={statusInfo.color}
                        size="small"
                        aria-live="polite"
                    />
                </CardContent>
            </Box>
        </Card>
    );
}

export default TechnologyCard;