// src/App.jsx

import { useState } from 'react'; // useEffect больше не нужен!
import './App.css';
import TechnologyCard from './components/TechnologyCard';
// !!! Импортируем наш новый кастомный хук
import useLocalStorage from './hooks/useLocalStorage'; 

const INITIAL_DATA = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
];
const STORAGE_KEY = 'technology-tracker-data'; 

function App() {
  
  // !!! 1. Используем кастомный хук: вся логика LocalStorage внутри него
  const [technologies, setTechnologies] = useLocalStorage(STORAGE_KEY, INITIAL_DATA);
  // 

  // 2. Состояние для формы добавления
  const [newTech, setNewTech] = useState({ title: '', description: '' });

  // 3. Функции обновления (используем функциональный сеттер prevTech для большей надежности)
  const handleStatusChange = (id) => {
    setTechnologies(prevTech => prevTech.map(tech => {
      if (tech.id === id) {
        let nextStatus;
        if (tech.status === 'not-started') {
          nextStatus = 'in-progress';
        } else if (tech.status === 'in-progress') {
          nextStatus = 'completed';
        } else {
          nextStatus = 'not-started';
        }
        return { ...tech, status: nextStatus };
      }
      return tech; 
    }));
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
    <div className="app">
      <h1>Трекер изучения технологий (Практика 21-22: Custom Hook)</h1>
      
      {/* Форма и вывод списка - без изменений */}
      <form onSubmit={handleAddTech} className="add-form">
        <input 
          placeholder="Название технологии (обязательно)" 
          value={newTech.title}
          onChange={e => setNewTech({...newTech, title: e.target.value})}
        />
        <input 
          placeholder="Краткое описание" 
          value={newTech.description}
          onChange={e => setNewTech({...newTech, description: e.target.value})}
        />
        <button type="submit">➕ Добавить</button>
      </form>
      
      <div className="card-list">
        {technologies.map((tech) => (
          <TechnologyCard 
            key={tech.id} 
            title={tech.title} 
            description={tech.description} 
            status={tech.status} 
            onStatusChange={() => handleStatusChange(tech.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;