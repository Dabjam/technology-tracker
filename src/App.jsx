import { useState } from 'react';
import ProgressHeader from './ProgressHeader'; 
import './App.css'; 

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'HTML & CSS Основы',
      description: 'Изучение семантики HTML5 и базовых стилей CSS.',
      status: 'Изучено' 
    },
    {
      id: 2,
      title: 'JavaScript ES6+',
      description: 'Освоение современных возможностей JS: стрелочные функции, промисы, асинхронность.',
      status: 'В процессе' // В процессе
    },
    {
      id: 3,
      title: 'React Components',
      description: 'Создание функциональных компонентов и работа с props.',
      status: 'Не начато' // Не начато
    },
    {
      id: 4,
      title: 'React Hooks (useState)',
      description: 'Управление состоянием компонента.',
      status: 'done'
    }
  ]);
  const toggleTechnologyStatus = (id) => {
    setTechnologies(prevTech =>
      prevTech.map(tech => {
        if (tech.id === id) {
          let newStatus = '';
          switch (tech.status) {
            case 'not-started':
              newStatus = 'in-progress';
              break;
            case 'in-progress':
              newStatus = 'done';
              break;
            case 'done':
              newStatus = 'not-started';
              break;
            default:
              newStatus = 'not-started';
          }
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  return (
    <div className="app-container">
      <h1>Дорожная карта Front-end (Практическая 19)</h1>
      <ProgressHeader technologies={technologies} /> 

      <div className="tech-list">
        {technologies.map(tech => (
          <div 
            key={tech.id} 
            className={`tech-card ${tech.status}`}
            onClick={() => toggleTechnologyStatus(tech.id)} 
            title={`Текущий статус: ${tech.status}. Нажмите, чтобы изменить.`}
          >
            <div className="card-header">
              <h3>{tech.title}</h3>
              <span className={`status-badge ${tech.status}`}>{tech.status}</span>
            </div>
            <p>{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;