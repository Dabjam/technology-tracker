import React from 'react';

function SearchInput({ searchTerm, onSearchChange, resultsCount, totalCount }) {
    return (
        <div className="search-controls-container">
            <h2 className="section-title">Поиск технологий</h2>
            <input
                type="text"
                placeholder="Начните вводить название или описание..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input" 
                style={{
                    padding: '10px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '10px'
                }}
            />
            <p style={{ fontSize: '14px', color: '#666' }}>
                Найдено: **{resultsCount}** из {totalCount}
            </p>
        </div>
    );
}

export default SearchInput;