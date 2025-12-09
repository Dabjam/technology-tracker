import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function TechnologyModal({ tech, onClose, onUpdateNotes, onToggleStatus }) {
    const [currentNotes, setCurrentNotes] = useState(tech.notes);

    const handleSaveAndClose = () => {
        onUpdateNotes(tech.id, currentNotes); 
        onClose();
    };

    const handleStatusToggle = (e) => {
        e.stopPropagation();
        onToggleStatus(tech.id);
    };

    const statusText = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };

    const statusClass = `status-${tech.status}`;
    const nextStatusText = tech.status === 'completed' ? 'Сбросить' : 'Сменить статус';

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleSaveAndClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Заметки для: {tech.title}</h2>
                    <button className="close-btn" onClick={handleSaveAndClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-description">{tech.description}</p>
                    <p className="modal-category">Категория: {tech.category}</p>
                    
                    <div className="modal-status-controls">
                        <span className={`card-status ${statusClass}`}>{statusText[tech.status]}</span>
                        <button 
                            className="btn btn-info"
                            style={{ marginLeft: '10px' }}
                            onClick={handleStatusToggle}
                        >
                            {nextStatusText}
                        </button>
                    </div>

                    <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Ваши заметки:</h4>
                    <textarea
                        value={currentNotes}
                        onChange={(e) => setCurrentNotes(e.target.value)}
                        placeholder="Заметки по изучению..."
                        rows="8"
                        className="modal-textarea"
                    />
                </div>
                
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={handleSaveAndClose}>
                        Сохранить и закрыть
                    </button>
                </div>
            </div>
        </div>,
        document.body 
    );
}

export default TechnologyModal;