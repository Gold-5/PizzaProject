import '../styles/Kanban.css';

const STATUSES = [
  { key: 'Запланировано', label: 'Запланировано', color: '#f77f00' },
  { key: 'В работе', label: 'В работе', color: '#0066cc' },
  { key: 'Выполнено', label: 'Выполнено', color: '#06a77d' },
];

export default function KanbanBoard({ tasks, onStatusChange, onDelete }) {
  return (
    <div className="kanban-board">
      {STATUSES.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status.key);
        return (
          <div key={status.key} className="kanban-column">
            <div className="kanban-column-header" style={{ borderColor: status.color }}>
              <h3>{status.label}</h3>
              <span className="kanban-count">{columnTasks.length}</span>
            </div>
            <div className="kanban-cards">
              {columnTasks.length === 0 ? (
                <div className="kanban-empty">Нет задач</div>
              ) : (
                columnTasks.map((task) => (
                  <div key={task.id} className="kanban-card">
                    <h4>{task.title}</h4>
                    {task.description && <p>{task.description}</p>}
                    {task.assignedTo && (
                      <span className="kanban-assigned">👤 {task.assignedTo}</span>
                    )}
                    <div className="kanban-card-actions">
                      <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className="status-select"
                      >
                        {STATUSES.map((s) => (
                          <option key={s.key} value={s.key}>{s.label}</option>
                        ))}
                      </select>
                      <button className="btn-icon btn-delete" onClick={() => onDelete(task.id)} title="Удалить">
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
