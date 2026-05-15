import { useEffect, useState } from 'react';
import { projectsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Проекты</h1>
        <button className="btn btn-primary">+ Новый проект</button>
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
                <button className="btn btn-sm">Открыть</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
