// src/pages/TechnologyListPage.jsx

import TechnologyCardMui from '../components/TechnologyCardMui'; // !!! Используем новую карточку
import useLocalStorage from '../hooks/useLocalStorage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

// !!! Импортируем компоненты MUI
import { Button, TextField, Box, Grid, Typography, Paper } from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add'; 

// ... (INITIAL_DATA и STORAGE_KEY остаются) ...
const INITIAL_DATA = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
];
const STORAGE_KEY = 'technology-tracker-data'; 

function TechnologyListPage() {
  
  // ... (API, LocalStorage, useEffect - остаются без изменений) ...
  // *Для краткости примера, я оставляю только LocalStorage как основу, 
  // *но ты можешь вернуть API-логику из Пр. 24, если она нужна.
  const [technologies, setTechnologies] = useLocalStorage(STORAGE_KEY, INITIAL_DATA);
  const [newTech, setNewTech] = useState({ title: '', description: '' });

  const handleStatusChange = (id) => {
    // Логика изменения статуса (как раньше)
    // ...
  };

  const handleAddTech = (e) => {
    e.preventDefault(); 
    if (!newTech.title) return; 

    setTechnologies(prevTech => [
      { 
        id: Date.now(), 
        title: newTech.title, 
        description: newTech.description, 
        status: 'not-started' 
      },
      ...prevTech, 
    ]);
    setNewTech({ title: '', description: '' }); 
  };
  
  return (
    <Box sx={{ p: 0 }}>
      {/* Форма добавления, оформленная как Paper (лист бумаги) */}
      <Paper component="form" onSubmit={handleAddTech} elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
            Добавить новую технологию
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
                label="Название технологии (обязательно)"
                variant="outlined"
                fullWidth
                required // P25: Атрибут HTML5 для базовой валидации
                value={newTech.title}
                onChange={e => setNewTech({...newTech, title: e.target.value})}
                size="small"
            />
            <TextField 
                label="Краткое описание"
                variant="outlined"
                fullWidth
                value={newTech.description}
                onChange={e => setNewTech({...newTech, description: e.target.value})}
                size="small"
            />
            <Button 
                type="submit" 
                variant="contained" 
                startIcon={<AddIcon />} 
                disabled={!newTech.title} // P25: Отключение кнопки при отсутствии заголовка
            >
                Добавить
            </Button>
        </Box>
      </Paper>
      
      {/* Список карточек, оформленный с помощью Grid */}
      <Grid container spacing={3}>
        {technologies.map((tech) => (
          // Grid item - определяет ширину (12/4 = 3 на больших экранах, 12/6 = 2 на средних)
          <Grid item xs={12} sm={6} md={4} key={tech.id}>
            <Link 
              to={`/tech/${tech.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <TechnologyCardMui 
                title={tech.title} 
                description={tech.description} 
                status={tech.status} 
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TechnologyListPage;