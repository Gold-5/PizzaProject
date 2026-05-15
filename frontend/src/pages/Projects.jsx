import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectService } from '../services/dataService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await ProjectService.getAllProjects();
      setProjects(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await ProjectService.createProject(newProject);
      setNewProject({ name: '', description: '' });
      setShowForm(false);
      await loadProjects();
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить проект?')) return;
    try {
      await ProjectService.deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Проекты</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Отмена' : '+ Новый проект'}
        </button>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {showForm && (
        <form className="create-form" onSubmit={handleCreate}>
          <div className="form-group">
            <label>Название проекта</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              required
              placeholder="Введите название"
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
          <button type="submit" className="btn btn-primary">Создать</button>
        </form>
      )}

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
                  {new Date(project.startDate).toLocaleDateString('ru-RU')}
                </span>
                <div className="project-actions">
                  <Link to={`/projects/${project.id}`} className="btn btn-sm">Открыть</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
