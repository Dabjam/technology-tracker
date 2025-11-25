import TechnologyCardMui from '../components/TechnologyCardMui'; 
import useLocalStorage from '../hooks/useLocalStorage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Button, TextField, Box, Grid, Typography, Paper } from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add'; 

const INITIAL_DATA = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
];
const STORAGE_KEY = 'technology-tracker-data'; 

function TechnologyListPage() {
  const [technologies, setTechnologies] = useLocalStorage(STORAGE_KEY, INITIAL_DATA);
  const [newTech, setNewTech] = useState({ title: '', description: '' });

  const handleStatusChange = (id) => {
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
      <Paper component="form" onSubmit={handleAddTech} elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
            Добавить новую технологию
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
                label="Название технологии (обязательно)"
                variant="outlined"
                fullWidth
                required 
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
                disabled={!newTech.title} 
            >
                Добавить
            </Button>
        </Box>
      </Paper>
      <Grid container spacing={3}>
        {technologies.map((tech) => (
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