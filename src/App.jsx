import './App.css';
import TechnologyCard from './components/TechnologyCard';

function App() {
  const technologies = [
    { id: 1, title: 'HTML & CSS Basics', description: 'Основы разметки и стилизации', status: 'completed' },
    { id: 2, title: 'JavaScript ES6+', description: 'Современный синтаксис JS', status: 'in-progress' },
    { id: 3, title: 'React Hooks (useState)', description: 'Изучение состояния компонентов', status: 'not-started' },
  ];

  return (
    <div className="app">
      <h1>Трекер изучения технологий (Практика 19)</h1>
      <div className="card-list">
        {technologies.map((tech) => (
          <TechnologyCard 
            key={tech.id}                
            title={tech.title}            
            description={tech.description}
            status={tech.status} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;