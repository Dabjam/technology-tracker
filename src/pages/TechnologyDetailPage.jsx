// src/pages/TechnologyDetailPage.jsx

import { useParams, Link as RouterLink } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from 'react'; // !!! ШАГ 1: Импортируем useState

// Импортируем компоненты MUI
import { Button, Typography, Box, Paper, Chip, TextField } from '@mui/material'; // !!! Добавляем TextField
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function TechnologyDetailPage() {
  const { id } = useParams(); 
  const [technologies, setTechnologies] = useLocalStorage('technology-tracker-data', []);
  const technology = technologies.find(tech => tech.id == id); 
  
  // !!! ШАГ 2: Состояние для заметок
  // Инициализируем заметки значением, которое уже есть в технологии, или пустой строкой
  const [notes, setNotes] = useState(technology?.notes || ''); 

  if (!technology) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="error">Технология не найдена (ID: {id})</Typography>
        <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Назад к списку
        </Button>
      </Box>
    );
  }

  const updateStatus = (newStatus) => {
    setTechnologies(prevTech => prevTech.map(tech => 
      tech.id == id ? { ...tech, status: newStatus } : tech
    ));
  };
  
  // !!! ШАГ 3: Функция для сохранения заметок в LocalStorage
  const saveNotes = (newNotes) => {
    // 1. Обновляем локальное состояние заметок (хотя в данном случае это уже сделано onChange)
    // setNotes(newNotes); 
    
    // 2. Обновляем состояние технологий, включая новые заметки, чтобы useLocalStorage их сохранил
    setTechnologies(prevTech => prevTech.map(tech => 
      tech.id == id ? { ...tech, notes: newNotes } : tech
    ));
  };
  
  const getChipColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      default: return 'warning';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button 
        component={RouterLink} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        variant="outlined" 
        sx={{ mb: 3 }}
      >
        Назад к списку
      </Button>
      
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {technology.title}
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>Описание</Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>{technology.description}</Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Текущий статус: 
            <Chip 
                label={technology.status.toUpperCase()} 
                color={getChipColor(technology.status)} 
                sx={{ ml: 2 }}
            />
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant={technology.status === 'not-started' ? 'contained' : 'outlined'}
              color="warning"
              onClick={() => updateStatus('not-started')}
            >
              Не начато
            </Button>
            <Button
              variant={technology.status === 'in-progress' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => updateStatus('in-progress')}
            >
              В процессе
            </Button>
            <Button
              variant={technology.status === 'completed' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => updateStatus('completed')}
            >
              Завершено
            </Button>
          </Box>
        </Box>

        {/* !!! ШАГ 4: Секция для заметок (JSX) !!! */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>Мои заметки</Typography>
          <TextField
            label="Добавить личные заметки по этой технологии"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)} // Обновляем локальное состояние при каждом вводе
            // Сохраняем в LocalStorage при потере фокуса (когда пользователь закончил ввод)
            onBlur={(e) => saveNotes(e.target.value)} 
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default TechnologyDetailPage;