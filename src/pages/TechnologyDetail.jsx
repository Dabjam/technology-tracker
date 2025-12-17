import React, { useMemo, useCallback, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import ResourceLoader from '../components/ResourceLoader';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const { technologies, loading, error, updateTechnology, deleteTechnology } = useTechnologiesApi();
    const [showResourceLoader, setShowResourceLoader] = useState(false);

    const technology = useMemo(() => {
        return technologies.find(t => t.id === parseInt(techId));
    }, [technologies, techId]);

    const updateStatus = (newStatus) => {
        if (technology) {
            updateTechnology(technology.id, { status: newStatus });
        }
    };

    const handleNotesChange = useCallback((e) => {
        if (technology) {
            updateTechnology(technology.id, { notes: e.target.value });
        }
    }, [technology, updateTechnology]);

    const handleDelete = () => {
        if (window.confirm(`Вы уверены, что хотите удалить технологию "${technology?.title}"?`)) {
            deleteTechnology(technology.id);
            navigate('/technologies');
        }
    };

    const handleResourceSelect = (resource) => {
        if (technology) {
            const currentResources = technology.resources || [];
            
            const isAlreadyAdded = currentResources.some(
                existing => existing === resource.url || existing.url === resource.url
            );
            
            if (!isAlreadyAdded) {
                const newResources = [...currentResources, resource];
                updateTechnology(technology.id, { resources: newResources });
                
                alert(`✅ Ресурс "${resource.title}" добавлен!`);
            } else {
                alert('⚠️ Этот ресурс уже добавлен');
            }
        }
    };

    const toggleResourceLoader = () => {
        setShowResourceLoader(!showResourceLoader);
    };

    if (loading) return <div className="loading-state">Загрузка...</div>;
    if (error) return <div className="error-state">Ошибка: {error}</div>;

    if (!technology) {
        return (
            <div className="error-state">
                <h3>Технология не найдена</h3>
                <p>Технология с ID {techId} не существует или была удалена.</p>
                <Link to="/technologies" className="btn btn-info" style={{ marginTop: '10px' }}>
                    ← К списку технологий
                </Link>
            </div>
        );
    }

    const availableStatuses = ['not-started', 'in-progress', 'completed'];

    const getStatusClassName = (status) => {
        let className = 'btn status-btn';
        if (technology.status === status) {
            className += ` active-status active-status-${status}`;
        }
        return className;
    };

    // Форматирование ресурсов
    const formatResource = (resource, index) => {
        if (typeof resource === 'object') {
            return (
                <li key={index}>
                    <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <span style={{ fontSize: '16px' }}>
                            {resource.type === 'documentation' ? '📚' :
                             resource.type === 'github' ? '🐙' :
                             resource.type === 'tutorial' ? '🎓' : '🔗'}
                        </span>
                        <span>
                            <strong>{resource.title}</strong> - {resource.url}
                        </span>
                    </a>
                </li>
            );
        }
        
        return (
            <li key={index}>
                <a href={resource} target="_blank" rel="noopener noreferrer">
                    🔗 {resource}
                </a>
            </li>
        );
    };

    return (
        <div className="technology-detail-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Link to="/technologies" className="btn btn-back">
                    ← Назад к списку
                </Link>
                
                <button 
                    onClick={handleDelete}
                    className="btn btn-danger"
                    style={{ padding: '8px 16px' }}
                >
                    🗑️ Удалить технологию
                </button>
            </div>

            <h1 className="detail-title">{technology.title}</h1>
            <p className="detail-category">
                <strong>Категория:</strong> {technology.category} 
                <span style={{ margin: '0 10px' }}>•</span>
                <strong>Сложность:</strong> {technology.difficulty}
            </p>

            <div className="detail-section">
                <h3>📄 Описание</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {technology.description || 'Описание отсутствует.'}
                </p>
            </div>

            <div className="detail-section status-section">
                <h3>⭐ Статус изучения</h3>
                <p style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
                    Текущий статус:
                    <span
                        className={`card-status status-${technology.status}`}
                        style={{ marginLeft: '10px' }}
                    >
                        {technology.status.replace('-', ' ')}
                    </span>
                </p>

                <div className="status-buttons-group">
                    {availableStatuses.map(status => (
                        <button
                            key={status}
                            onClick={() => updateStatus(status)}
                            className={getStatusClassName(status)}
                        >
                            {status.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="detail-section notes-section">
                <h3>✏️ Мои заметки (Автосохранение)</h3>
                <textarea
                    value={technology.notes || ''} 
                    onChange={handleNotesChange}
                    placeholder="Ваши заметки по этой технологии..."
                    rows="10"
                    className="notes-textarea"
                />
                <small style={{ color: 'var(--color-subtext)', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                    Заметки автоматически сохраняются при изменении
                </small>
            </div>

            <div className="detail-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3>🔗 Дополнительные ресурсы</h3>
                    <button 
                        onClick={toggleResourceLoader}
                        className="btn btn-primary"
                        style={{ padding: '8px 15px', fontSize: '14px' }}
                    >
                        {showResourceLoader ? '✕ Скрыть загрузчик' : '🌐 Загрузить из API'}
                    </button>
                </div>
                
                {/* Компонент загрузки ресурсов из API */}
                {showResourceLoader && (
                    <div style={{ marginBottom: '20px' }}>
                        <ResourceLoader 
                            techName={technology.title}
                            onResourceSelect={handleResourceSelect}
                            existingResources={technology.resources || []}
                        />
                    </div>
                )}
                
                {technology.resources && technology.resources.length > 0 ? (
                    <div>
                        <ul className="resource-list" style={{ 
                            maxHeight: '300px', 
                            overflowY: 'auto',
                            padding: '15px',
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)'
                        }}>
                            {technology.resources.map((res, index) => formatResource(res, index))}
                        </ul>
                        <p style={{ 
                            marginTop: '10px', 
                            fontSize: '12px', 
                            color: 'var(--color-subtext)' 
                        }}>
                            Всего ресурсов: {technology.resources.length}
                        </p>
                    </div>
                ) : (
                    <div style={{ 
                        padding: '20px', 
                        textAlign: 'center', 
                        border: '2px dashed var(--border-color)', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0,0,0,0.02)'
                    }}>
                        <p style={{ color: 'var(--color-subtext)' }}>Ресурсы еще не добавлены.</p>
                        <p style={{ color: 'var(--color-subtext)', fontSize: '14px', marginTop: '10px' }}>
                            Используйте кнопку "Загрузить из API" выше, чтобы найти полезные материалы
                        </p>
                    </div>
                )}
            </div>

            <div className="detail-section" style={{ 
                backgroundColor: 'rgba(0,0,0,0.02)', 
                padding: '20px', 
                borderRadius: '8px',
                marginTop: '30px'
            }}>
                <h3>📊 Метаданные</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <strong>ID технологии:</strong>
                        <p>{technology.id}</p>
                    </div>
                    <div>
                        <strong>Дата создания:</strong>
                        <p>{technology.createdAt ? new Date(technology.createdAt).toLocaleDateString() : 'Не указана'}</p>
                    </div>
                    <div>
                        <strong>Всего ресурсов:</strong>
                        <p>{technology.resources ? technology.resources.length : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;    