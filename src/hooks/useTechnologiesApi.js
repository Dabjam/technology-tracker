import { useState, useEffect } from 'react';

const MOCK_API_DATA = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
    { id: 4, title: 'Redux Toolkit', description: 'Глобальное управление состоянием', status: 'not-started' },
    { id: 5, title: 'Node.js Basics', description: 'Основы серверной разработки', status: 'in-progress' },
];

function useTechnologiesApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchTechnologies = () => {
    setLoading(true);
    setError(null);
    const delay = 3000; 
    
    setTimeout(() => {
        setData(MOCK_API_DATA);
        setLoading(false);

        // Для демонстрации ошибки можно раскомментировать:
        // setError("Не удалось загрузить данные из API.");
        // setData(null);
        // setLoading(false);

    }, delay);
  };

  useEffect(() => {
    fetchTechnologies();
  }, []); 

  return { technologies: data, loading, error, refetch: fetchTechnologies };
}

export default useTechnologiesApi;