import { useEffect, useState } from 'react';
import { tasksApi, projectsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Board.css';

const COLUMNS = [
  { id: 'Запланировано', title: 'Запланировано', color: '#e8f0fe' },
  { id: 'В работе', title: 'В работе', color: '#fff3cd' },
  { id: 'На проверке', title: 'На проверке', color: '#e7d4f5' },
  { id: 'Завершено', title: 'Завершено', color: '#d4edda' },
];

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksRes, projectsRes] = await Promise.all([tasksApi.getAll(), projectsApi.getAll()]);
      setTasks(tasksRes.data || []);
      setProjects(projectsRes.data || []);
      if (projectsRes.data?.length > 0) {
        setSelectedProject(projectsRes.data[0].id);
      }
    } catch (err) {
      setError(err);
      console.error('Ошибка загрузки данных:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(
      (t) => t.status === status && (!selectedProject || t.projectId === parseInt(selectedProject)),
    );
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Оптимистичное обновление
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));

      await tasksApi.updateStatus(taskId, newStatus);
    } catch (err) {
      setError(err);
      console.error('Ошибка изменения статуса:', err);
      loadData();
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !selectedProject) {
      alert('Введите название задачи и выберите проект');
      return;
    }

    try {
      const response = await tasksApi.create({
        ...newTask,
        projectId: parseInt(selectedProject),
      });

      setTasks([...tasks, response.data]);
      setShowModal(false);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (err) {
      setError(err);
      console.error('Ошибка создания задачи:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Вы уверены что хотите удалить задачу?')) {
      try {
        setTasks(tasks.filter((t) => t.id !== taskId));
        await tasksApi.delete(taskId);
      } catch (err) {
        setError(err);
        console.error('Ошибка удаления задачи:', err);
        loadData();
      }
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== newStatus) {
      await handleStatusChange(taskId, newStatus);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="board-page">
      <div className="board-header">
        <h1>📋 Доска задач</h1>
        <div className="board-controls">
          {projects.length > 0 && (
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="project-filter"
            >
              <option value="">Все проекты</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Новая задача
          </button>
        </div>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      <div className="kanban-board">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            className="kanban-column"
            style={{ backgroundColor: column.color }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="column-header">
              <h2>{column.title}</h2>
              <span className="task-count">{getTasksByStatus(column.id).length}</span>
            </div>

            <div className="column-tasks">
              {getTasksByStatus(column.id).map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </div>

                  {task.description && <p className="task-description">{task.description}</p>}

                  <div className="task-footer">
                    {task.assignedTo && (
                      <div className="task-assignee">👤 {task.assignedTo.username}</div>
                    )}
                    {task.dueDate && (
                      <div className="task-duedate">
                        📅 {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                      </div>
                    )}
                  </div>

                  <div className="task-status">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="status-select"
                    >
                      {COLUMNS.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="empty-state">Нет задач</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Создать новую задачу</h2>

            <div className="form-group">
              <label>Проект *</label>
              <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                <option value="">Выберите проект</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Название *</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Введите название задачи"
              />
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Введите описание (опционально)"
              />
            </div>

            <div className="form-group">
              <label>Срок выполнения</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>

            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Отмена
              </button>
              <button className="btn btn-primary" onClick={handleCreateTask}>
                Создать задачу
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
