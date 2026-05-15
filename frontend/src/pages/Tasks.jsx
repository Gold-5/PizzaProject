import { useEffect, useState } from 'react';
import { tasksApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Tasks.css';

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
      const response = await tasksApi.getAll();
      setTasks(response.data || []);
    } catch (err) {
      setError(err);
      console.error('Ошибка загрузки задач:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Задачи</h1>
        <button className="btn btn-primary">+ Новая задача</button>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>Задач не найдено</p>
          <p>Создайте первую задачу</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <h3>{task.name}</h3>
                <span className={`task-status status-${task.status?.toLowerCase() || 'pending'}`}>
                  {task.status || 'Не определен'}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="task-date">
                  {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                </span>
                <button className="btn btn-sm">Открыть</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
