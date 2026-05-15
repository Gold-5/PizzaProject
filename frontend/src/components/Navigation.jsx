import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="pizza-icon">🍕</span>
          Pizza Project
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Главная
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
              Проекты
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
              Задачи
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/auth" className={`nav-link ${isActive('/auth') ? 'active' : ''}`}>
              Вход
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
