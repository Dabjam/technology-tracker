function TechnologyCard({ tech, onToggleStatus, onCardClick }) { 
    
    const statusText = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };

    const statusClass = `status-${tech.status}`;

    const handleToggle = (e) => {
        e.stopPropagation(); 
        onToggleStatus(tech.id);
    }

    return (
        <div className={`tech-card ${statusClass}`} onClick={() => onCardClick(tech.id)}>
            <h3 className="card-title">{tech.title}</h3>
            <p className="card-category">{tech.category}</p>
            <p className="card-description">{tech.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span className="card-status">
                    {statusText[tech.status]}
                </span>
                <button 
                    onClick={handleToggle} 
                    className={`btn btn-info`} 
                    style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                    Сменить статус
                </button>
            </div>
            
        </div>
    );
}

export default TechnologyCard;