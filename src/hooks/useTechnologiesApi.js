import { useState, useCallback } from 'react';

// Моковый API для демонстрации
const MOCK_RESOURCES_API = {
    'React': [
        { title: 'Официальная документация', url: 'https://react.dev', type: 'documentation' },
        { title: 'React на GitHub', url: 'https://github.com/facebook/react', type: 'github' },
        { title: 'React Tutorial', url: 'https://react-tutorial.app', type: 'tutorial' }
    ],
    'Node.js': [
        { title: 'Официальный сайт', url: 'https://nodejs.org', type: 'documentation' },
        { title: 'Node.js API Docs', url: 'https://nodejs.org/api/', type: 'api' },
        { title: 'npm', url: 'https://www.npmjs.com', type: 'package-manager' }
    ],
    'TypeScript': [
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'documentation' },
        { title: 'Playground', url: 'https://www.typescriptlang.org/play', type: 'sandbox' }
    ],
    'Docker': [
        { title: 'Docker Docs', url: 'https://docs.docker.com', type: 'documentation' },
        { title: 'Docker Hub', url: 'https://hub.docker.com', type: 'registry' }
    ],
    'GraphQL': [
        { title: 'GraphQL.org', url: 'https://graphql.org', type: 'documentation' },
        { title: 'GraphQL Playground', url: 'https://graphql.org/playground/', type: 'sandbox' }
    ],
    'MongoDB': [
        { title: 'MongoDB Docs', url: 'https://docs.mongodb.com', type: 'documentation' },
        { title: 'MongoDB Atlas', url: 'https://www.mongodb.com/cloud/atlas', type: 'cloud' }
    ]
};

// Функция для поиска ресурсов
const findResourcesInMockApi = (techName) => {
    if (!techName || techName.trim() === '') return [];
    
    const normalizedTechName = techName.toLowerCase();
    
    // Ищем точное совпадение
    for (const [key, resources] of Object.entries(MOCK_RESOURCES_API)) {
        if (key.toLowerCase() === normalizedTechName) {
            return resources;
        }
    }
    
    // Ищем частичное совпадение
    for (const [key, resources] of Object.entries(MOCK_RESOURCES_API)) {
        if (key.toLowerCase().includes(normalizedTechName) || 
            normalizedTechName.includes(key.toLowerCase())) {
            return resources;
        }
    }
    
    // Общие ресурсы
    return [
        { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'documentation' },
        { title: 'Stack Overflow', url: 'https://stackoverflow.com', type: 'qna' },
        { title: 'GitHub', url: 'https://github.com', type: 'github' }
    ];
};

const useTechResourcesApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resources, setResources] = useState([]);

    // Загрузка ресурсов по названию технологии
    const fetchResources = useCallback(async (techName) => {
        if (!techName || techName.trim() === '') {
            setError('Введите название технологии');
            return [];
        }
        
        setLoading(true);
        setError(null);
        
        try {
            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Используем моковый API
            const mockResources = findResourcesInMockApi(techName);
            
            if (mockResources.length === 0) {
                setError(`Ресурсы для "${techName}" не найдены`);
            } else {
                setResources(mockResources);
            }
            
            return mockResources;
            
        } catch (err) {
            const errorMsg = `Ошибка загрузки: ${err.message}`;
            setError(errorMsg);
            console.error('Error fetching resources:', err);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Сброс ресурсов
    const resetResources = useCallback(() => {
        setResources([]);
        setError(null);
    }, []);

    return {
        resources,
        loading,
        error,
        fetchResources,
        resetResources
    };
};

export default useTechResourcesApi;