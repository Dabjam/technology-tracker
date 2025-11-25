import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';

function App() {
  return (
    <BrowserRouter> 
      <div className="app">
        <h1>Трекер изучения технологий (Практика 23-24)</h1>
        <Routes> 
          <Route path="/" element={<TechnologyListPage />} /> 
          
          <Route path="/tech/:id" element={<TechnologyDetailPage />} /> 
          
          <Route path="*" element={<h2>404 | Страница не найдена</h2>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;