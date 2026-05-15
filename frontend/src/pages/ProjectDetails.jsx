import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectService, TaskService } from '../services/dataService';
import KanbanBoard from '../components/KanbanBoard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Projects.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectData, tasksData] = await Promise.all([
        ProjectService.getProjectById(id),
        TaskService.getTasksByProject(id),
      ]);
      setProject(projectData);
      setTasks(tasksData || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await TaskService.createTask({
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo || null,
        projectId: parseInt(id),
        status: 'Запланировано',
      });
      setNewTask({ title: '', description: '', assignedTo: '' });
      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await TaskService.updateTaskStatus(taskId, newStatus);
      await loadData();
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Удалить задачу?')) return;
    try {
      await TaskService.deleteTask(taskId);
      await loadData();
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <div className="empty-state"><p>Проект не найден</p></div>;

  return (
    <div className="project-details-page">
      <div className="page-header">
        <div>
          <Link to="/projects" className="back-link">← Назад к проектам</Link>
          <h1>{project.name}</h1>
          <p className="project-desc">{project.description}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Отмена' : '+ Новая задача'}
        </button>
      </div>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {showForm && (
        <form className="create-form" onSubmit={handleCreateTask}>
          <div className="form-group">
            <label>Название задачи</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              placeholder="Введите название задачи"
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
            <label>Назначено</label>
            <input
              type="text"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              placeholder="Имя исполнителя"
            />
          </div>
          <button type="submit" className="btn btn-primary">Создать задачу</button>
        </form>
      )}

      <KanbanBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
