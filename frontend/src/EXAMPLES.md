// Пример использования компонентов и hooks

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProjectService } from '../services/dataService';
import { getErrorMessage } from '../utils/helpers';

export default function ExampleComponent() {
// Использование custom hook
const { user, isAuthenticated } = useAuth();

const [projects, setProjects] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

// Загрузка данных
useEffect(() => {
const loadData = async () => {
if (!isAuthenticated) return;

      try {
        setLoading(true);
        const data = await ProjectService.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadData();

}, [isAuthenticated]);

if (loading) return <div>Загрузка...</div>;
if (error) return <div>Ошибка: {error}</div>;

return (
<div>
<h2>Мои проекты ({projects.length})</h2>
{user && <p>Пользователь: {user.name}</p>}
<ul>
{projects.map(project => (
<li key={project.id}>{project.name}</li>
))}
</ul>
</div>
);
}
