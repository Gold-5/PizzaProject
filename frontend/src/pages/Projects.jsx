import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Projects.css';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    loadProjects();
  }, []);

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

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) {
      alert('Введите название проекта');
      return;
    }
    try {
      await projectsApi.create(newProject);
      setShowModal(false);
      setNewProject({ name: '', description: '' });
      loadProjects();
    } catch (err) {
      setError(err);
      console.error('Ошибка создания проекта:', err);
    }
  };

  const handleOpenProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) return <LoadingSpinner />;

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
                <button className="btn btn-sm" onClick={() => handleOpenProject(project.id)}>
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
