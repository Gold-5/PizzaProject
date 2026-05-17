import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

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
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link
                  to="/projects"
                  className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
                >
                  Проекты
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
                  Задачи
                </Link>
              </li>
            </>
          )}
          <li className="nav-item nav-user">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.username || user?.email}</span>
                <button className="btn btn-logout" onClick={handleLogout}>
                  Выход
                </button>
              </div>
            ) : (
              <Link to="/auth" className={`nav-link ${isActive('/auth') ? 'active' : ''}`}>
                Вход
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
