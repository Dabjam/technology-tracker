import React from 'react';

function TechnologyNotes({ techId, initialNotes, onNotesChange }) {
    return (
        <div className="tech-notes" style={{ marginTop: '15px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '5px', color: '#4a90e2' }}>Заметки:</h4>
            <textarea
                value={initialNotes}
                onChange={(e) => onNotesChange(techId, e.target.value)}
                placeholder="Добавьте свои заметки сюда..."
                rows="3"
                style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    resize: 'vertical',
                    fontSize: '13px'
                }}
            />
        </div>
    );
}

export default TechnologyNotes;