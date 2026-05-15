import { useEffect, useState } from 'react';
import { TaskService } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Tasks.css';

const STATUSES = ['Запланировано', 'В работе', 'Выполнено'];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getAllTasks();
      setTasks(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await TaskService.updateTaskStatus(id, status);
      await loadTasks();
    } catch (err) {
      setError(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Запланировано': return 'status-planned';
      case 'В работе': return 'status-progress';
      case 'Выполнено': return 'status-done';
      default: return '';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Все задачи</h1>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>Задач не найдено</p>
          <p>Создайте задачу в одном из проектов</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <h3>{task.title}</h3>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`status-select ${getStatusClass(task.status)}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {task.description && <p className="task-description">{task.description}</p>}
              <div className="task-footer">
                {task.assignedTo && <span className="task-assigned">👤 {task.assignedTo}</span>}
                <span className="task-date">
                  {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
