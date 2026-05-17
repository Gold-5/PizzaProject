import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectsApi, tasksApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Projects.css';

export default function Projects() {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProjectDetails();
    } else {
      loadProjects();
    }
  }, [projectId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getAll();
      setProjects(response.data || []);
    } catch (err) {
      setError(err);
      console.error('Ошибка загрузки проектов:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectDetails = async () => {
    try {
      setLoading(true);
      const projectResponse = await projectsApi.getById(projectId);
      setCurrentProject(projectResponse.data);

      const tasksResponse = await tasksApi.getByProject(projectId);
      setProjectTasks(tasksResponse.data || []);
    } catch (err) {
      setError(err);
      console.error('Ошибка загрузки деталей проекта:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) {
      alert('Введите название проекта');
      return;
    }
    try {
      const response = await projectsApi.create(newProject);
      // Добавляем новый проект в список сразу
      setProjects([...projects, response.data]);
      setShowModal(false);
      setNewProject({ name: '', description: '' });
    } catch (err) {
      setError(err);
      console.error('Ошибка создания проекта:', err);
      // Перезагружаем если ошибка
      loadProjects();
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      alert('Введите название задачи');
      return;
    }
    try {
      const response = await tasksApi.create({ ...newTask, projectId: parseInt(projectId) });
      // Добавляем новую задачу в список сразу
      setProjectTasks([...projectTasks, response.data]);
      setShowTaskModal(false);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      setError(err);
      console.error('Ошибка создания задачи:', err);
      // Перезагружаем если ошибка
      loadProjectDetails();
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Оптимистичное обновление
      setProjectTasks(projectTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));

      await tasksApi.updateStatus(taskId, newStatus);
    } catch (err) {
      setError(err);
      console.error('Ошибка изменения статуса:', err);
      // Перезагружаем если ошибка
      loadProjectDetails();
    }
  };

  const handleDeleteProject = async () => {
    if (confirm('Вы уверены что хотите удалить проект?')) {
      try {
        setLoading(true);
        await projectsApi.delete(projectId);
        // Обновляем список перед редиректом
        const response = await projectsApi.getAll();
        setProjects(response.data || []);
        setCurrentProject(null); // Очищаем текущий проект
        navigate('/projects');
      } catch (err) {
        setError(err);
        console.error('Ошибка удаления проекта:', err);
        setLoading(false);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Вы уверены что хотите удалить задачу?')) {
      try {
        // Оптимистичное обновление UI
        setProjectTasks(projectTasks.filter((t) => t.id !== taskId));

        // Отправляем запрос на сервер
        await tasksApi.delete(taskId);
      } catch (err) {
        setError(err);
        console.error('Ошибка удаления задачи:', err);
        // Перезагружаем задачи если ошибка
        loadProjectDetails();
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  // Просмотр деталей проекта
  if (currentProject) {
    return (
      <div className="projects-page">
        <div className="page-header">
          <div className="header-left">
            <button className="btn btn-secondary btn-small" onClick={() => navigate('/projects')}>
              ← Назад
            </button>
            <h1>{currentProject.name}</h1>
          </div>
          <button className="btn btn-danger" onClick={handleDeleteProject}>
            Удалить проект
          </button>
        </div>

        {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

        <div className="project-detail">
          <p className="project-description">{currentProject.description}</p>
          <div className="project-meta">
            <span>Создан: {new Date(currentProject.createdAt).toLocaleDateString('ru-RU')}</span>
            {currentProject.startDate && (
              <span>Начало: {new Date(currentProject.startDate).toLocaleDateString('ru-RU')}</span>
            )}
            {currentProject.endDate && (
              <span>Конец: {new Date(currentProject.endDate).toLocaleDateString('ru-RU')}</span>
            )}
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h2>Задачи проекта</h2>
            <button className="btn btn-primary" onClick={() => setShowTaskModal(true)}>
              + Новая задача
            </button>
          </div>

          {projectTasks.length === 0 ? (
            <div className="empty-state">
              <p>Задач в проекте не найдено</p>
              <p>Создайте первую задачу</p>
            </div>
          ) : (
            <div className="tasks-list">
              {projectTasks.map((task) => (
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
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showTaskModal && (
          <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
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
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Создать
                </button>
                <button className="btn btn-secondary" onClick={() => setShowTaskModal(false)}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Список проектов
  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Проекты</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Новый проект
        </button>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>Проектов не найдено</p>
          <p>Создайте первый проект, чтобы начать</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-footer">
                <span className="project-date">
                  {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                </span>
                <button className="btn btn-sm" onClick={() => navigate(`/projects/${project.id}`)}>
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
            <h2>Создать новый проект</h2>
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Название проекта"
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Описание проекта"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleCreateProject}>
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
