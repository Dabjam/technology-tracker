import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const { technologies, loading, error, updateTechnology, deleteTechnology } = useTechnologiesApi();

    const technology = useMemo(() => {
        return technologies.find(t => t.id === parseInt(techId));
    }, [technologies, techId]);

    const handleStatusUpdate = (newStatus) => {
        updateTechnology(technology.id, { status: newStatus });
    };

    const handleNotesChange = useCallback((e) => {
        updateTechnology(technology.id, { notes: e.target.value });
    }, [technology?.id, updateTechnology]);

    if (loading) return <div>Загрузка...</div>;
    if (!technology) return <div>Технология не найдена. <Link to="/">На главную</Link></div>;

    const availableStatuses = ['not-started', 'in-progress', 'completed'];

    return (
        <div className="technology-detail" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>{technology.title}</h1>
                <button 
                    onClick={() => {
                        if(window.confirm('Удалить эту технологию?')) {
                            deleteTechnology(technology.id);
                            navigate('/technologies');
                        }
                    }} 
                    className="btn btn-danger"
                >Удалить</button>
            </div>

            <p><strong>Категория:</strong> {technology.category}</p>

            <div className="detail-section" style={{ margin: '20px 0' }}>
                <h3>Статус: <span className={`card-status status-${technology.status}`}>{technology.status}</span></h3>
                <div className="status-buttons-group" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {availableStatuses.map(s => (
                        <button 
                            key={s} 
                            onClick={() => handleStatusUpdate(s)}
                            className={`btn ${technology.status === s ? 'btn-active' : 'btn-outline'}`}
                        >
                            {s.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="detail-section notes-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3>✏️ Заметки по изучению</h3>
                    <small style={{ color: 'var(--color-success)' }}>● Автосохранение активно</small>
                </div>
                <textarea
                    value={technology.notes || ''} 
                    onChange={handleNotesChange}
                    placeholder="Ваш детальный план обучения..."
                    className="notes-textarea custom-scrollbar"
                    style={{ 
                        width: '100%', 
                        minHeight: '400px', 
                        padding: '15px', 
                        fontSize: '16px',
                        lineHeight: '1.6',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)'
                    }}
                />
            </div>

            {technology.resources?.length > 0 && (
                <div className="detail-section" style={{ marginTop: '20px' }}>
                    <h3>🔗 Ресурсы</h3>
                    <ul>
                        {technology.resources.map((r, i) => (
                            <li key={i}><a href={r} target="_blank" rel="noreferrer">{r}</a></li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginTop: '30px' }}>← Назад</button>
        </div>
    );
}

export default TechnologyDetail;