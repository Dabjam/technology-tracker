// src/hooks/useTechnologiesApi.js

import { useState, useEffect, useCallback, useMemo } from 'react';

const LOCAL_STORAGE_KEY = 'techTrackerData'; 

const mockTechnologies = [
    { id: 1, title: 'React', description: 'Библиотека для создания пользовательских интерфейсов', category: 'frontend', difficulty: 'beginner', resources: ['https://react.dev'], status: 'completed', notes: 'Освоены хуки.' },
    { id: 2, title: 'Node.js', description: 'Среда выполнения JavaScript на сервере', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org'], status: 'in-progress', notes: 'Нужно разобраться с Express.' },
    { id: 3, title: 'TypeScript', description: 'Типизированное надмножество JavaScript', category: 'language', difficulty: 'intermediate', resources: ['https://www.typescriptlang.org'], status: 'not-started', notes: '' }
];

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateId = useCallback(() => {
        return Date.now() + Math.floor(Math.random() * 1000);
    }, []);

    const fetchTechnologies = useCallback(async () => {
        try {
            setLoading(true);
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                setTechnologies(JSON.parse(savedData));
            } else {
                setTechnologies(mockTechnologies);
            }
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err);
            setError("Не удалось загрузить данные.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTechnologies();
    }, [fetchTechnologies]);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(technologies));
        }
    }, [technologies, loading]);

    const addTechnology = useCallback((tech) => {
        const newTech = { 
            ...tech, 
            id: generateId(),
            notes: tech.notes || '',
            status: tech.status || 'not-started'
        };
        setTechnologies(prev => [...prev, newTech]);
    }, [generateId]);

    const updateTechnology = useCallback((id, updatedFields) => {
        setTechnologies(prev => prev.map(tech => 
            tech.id === id ? { ...tech, ...updatedFields } : tech
        ));
    }, []);

    const deleteTechnology = useCallback((id) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== id));
    }, []);

    const deleteAllTechnologies = useCallback(() => {
        setTechnologies([]);
    }, []);

    const batchAddTechnologies = useCallback((newTechs) => {
        const techsWithIds = newTechs.map(t => ({
            ...t,
            id: generateId() + Math.floor(Math.random() * 10000),
            status: t.status || 'not-started',
            notes: t.notes || '',
            resources: t.resources || []
        }));
        setTechnologies(prev => [...prev, ...techsWithIds]);
    }, [generateId]);

    const markAllCompleted = useCallback(() => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
    }, []);

    const resetAllStatuses = useCallback(() => {
        setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));
    }, []);

    const exportTechnologiesAsJson = useCallback(() => {
        const dataStr = JSON.stringify(technologies, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech_tracker_export_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [technologies]);

    const stats = useMemo(() => {
        const completed = technologies.filter(t => t.status === 'completed').length;
        const total = technologies.length;
        const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
        return { completed, total, progressPercentage };
    }, [technologies]);

    return {
        technologies, loading, error, stats,
        addTechnology, updateTechnology, deleteTechnology, 
        deleteAllTechnologies, batchAddTechnologies,
        markAllCompleted, resetAllStatuses, exportTechnologiesAsJson
    };
}

export default useTechnologiesApi;