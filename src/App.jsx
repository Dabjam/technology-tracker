// src/App.jsx

import './App.css'; // Наш старый CSS нам больше не нужен, но пока оставим
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';

// !!! Импортируем компоненты MUI
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';

// Создаем простую тему (можно усложнить позже, например, для темной темы)
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3498db', // Наш синий цвет
    },
    secondary: {
      main: '#2ecc71',
    },
  },
  typography: {
    h1: { fontSize: '2rem' },
  }
});

function App() {
  return (
    // 1. ThemeProvider: применяет тему ко всем дочерним компонентам
    <ThemeProvider theme={defaultTheme}>
      {/* 2. CssBaseline: сброс браузерных стилей (как normalize.css) */}
      <CssBaseline /> 
      
      <BrowserRouter> 
        {/* Box - универсальный контейнер MUI, используем его для центрирования */}
        <Box 
          sx={{ 
            maxWidth: 1200, 
            margin: '0 auto', 
            padding: 2, // 2 * 8px = 16px
          }}
        >
          <h1>Трекер изучения технологий (Практика 26: Material-UI)</h1>
          <Routes> 
            <Route path="/" element={<TechnologyListPage />} /> 
            <Route path="/tech/:id" element={<TechnologyDetailPage />} /> 
            <Route path="*" element={<h2>404 | Страница не найдена</h2>} /> 
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;