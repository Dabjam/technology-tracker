import React from 'react';

const convertToCsv = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    
    const rows = data.map(obj => 
        Object.values(obj).map(value => {
            const safeValue = typeof value === 'string' ? value.replace(/"/g, '""') : value;
            return `"${safeValue}"`;
        }).join(',')
    ).join('\n');
    
    return headers + '\n' + rows;
};

const downloadFile = (data, filename, mimeType) => {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


function ExportActions({ technologies }) {

    const handleExportJson = () => {
        const jsonString = JSON.stringify(technologies, null, 2); 
        downloadFile(jsonString, 'tech_tracker_export.json', 'application/json');
    };

    const handleExportCsv = () => {
        const csvString = convertToCsv(technologies);
        downloadFile(csvString, 'tech_tracker_export.csv', 'text/csv;charset=utf-8;');
    };

    return (
        <div className="export-actions-container">
            <h2 className="section-title">📥 Экспорт данных</h2>
            <div className="action-buttons-group">
                <button onClick={handleExportJson} className="btn btn-primary">
                    Экспорт в JSON
                </button>
                <button onClick={handleExportCsv} className="btn btn-warning">
                    Экспорт в CSV
                </button>
            </div>
        </div>
    );
}

export default ExportActions;