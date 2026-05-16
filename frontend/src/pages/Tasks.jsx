import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Tasks.css';

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', projectId: '' });

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

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !newTask.projectId) {
      alert('Введите название и выберите проект');
      return;
    }
    try {
      await tasksApi.create(newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', projectId: '' });
      loadTasks();
    } catch (err) {
      setError(err);
      console.error('Ошибка создания задачи:', err);
    }
  };

  const handleOpenTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Задачи</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Новая задача
        </button>
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
                <button className="btn btn-sm" onClick={() => handleOpenTask(task.id)}>
                  Открыть
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Создать новую задачу</h2>
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Название задачи"
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Описание задачи"
              />
            </div>
            <div className="form-group">
              <label>ID проекта</label>
              <input
                type="number"
                value={newTask.projectId}
                onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                placeholder="ID проекта"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleCreateTask}>
                Создать
              </button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
