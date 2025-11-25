import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3498db', 
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> 
      
      <BrowserRouter> 
        <Box 
          sx={{ 
            maxWidth: 1200, 
            margin: '0 auto', 
            padding: 2, // 2 * 8px = 16px
          }}
        >
          <h1>Трекер изучения технологий (Практика 25-26: Material-UI)</h1>
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