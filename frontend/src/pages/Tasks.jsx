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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Оптимистичное обновление
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));

      await tasksApi.updateStatus(taskId, newStatus);
    } catch (err) {
      setError(err);
      console.error('Ошибка изменения статуса:', err);
      // Перезагружаем если ошибка
      loadTasks();
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !newTask.projectId) {
      alert('Введите название и выберите проект');
      return;
    }
    try {
      const response = await tasksApi.create(newTask);
      // Добавляем новую задачу в список сразу
      setTasks([...tasks, response.data]);
      setShowModal(false);
      setNewTask({ title: '', description: '', projectId: '' });
    } catch (err) {
      setError(err);
      console.error('Ошибка создания задачи:', err);
      // Перезагружаем если ошибка
      loadTasks();
    }
  };

  const handleOpenTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Вы уверены что хотите удалить задачу?')) {
      try {
        // Оптимистичное обновление UI
        setTasks(tasks.filter((t) => t.id !== taskId));

        // Отправляем запрос на сервер
        await tasksApi.delete(taskId);
      } catch (err) {
        setError(err);
        console.error('Ошибка удаления задачи:', err);
        // Перезагружаем задачи если ошибка
        loadTasks();
      }
    }
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
                <h3>{task.title}</h3>
                <select
                  className={`task-status status-${task.status?.toLowerCase() || 'pending'}`}
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="Запланировано">Запланировано</option>
                  <option value="В работе">В работе</option>
                  <option value="Выполнено">Выполнено</option>
                </select>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="task-date">
                  {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                </span>
                <div className="task-actions">
                  <button className="btn btn-sm" onClick={() => handleOpenTask(task.id)}>
                    Открыть
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Удалить
                  </button>
                </div>
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
