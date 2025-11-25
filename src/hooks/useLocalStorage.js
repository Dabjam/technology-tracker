import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue = []) {
  
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    // Этот эффект будет выполняться при каждом изменении 'value'
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
    }
  }, [key, value]); // Зависимость от 'value'

  // Возвращаем то же, что и useState: текущее значение и функцию для его обновления
  return [value, setValue];
}

export default useLocalStorage;