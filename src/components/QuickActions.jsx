// src/components/QuickActions.jsx

function QuickActions({ onMarkAllCompleted, onResetAllStatuses, onSelectRandom }) {
    return (
        <div className="quick-actions-container">
            <h2 className="section-title">Быстрые действия</h2>
            <div className="action-buttons-group">
                <button onClick={onMarkAllCompleted} className="btn btn-success">
                    ✅ Отметить все как выполненные
                </button>
                <button onClick={onResetAllStatuses} className="btn btn-warning">
                    🔄 Сбросить все статусы
                </button>
                <button onClick={onSelectRandom} className="btn btn-info">
                    🎲 Случайный выбор следующей
                </button>
            </div>
        </div>
    );
}

export default QuickActions;