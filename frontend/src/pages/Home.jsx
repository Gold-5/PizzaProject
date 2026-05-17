import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Добро пожаловать в Pizza Project</h1>
        <p>Система управления проектами доставки пиццы</p>
        {isAuthenticated && (
          <p className="welcome-user">Привет, {user?.username || user?.email}!</p>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Управление проектами</h3>
          <p>Создавайте и управляйте проектами доставки пиццы</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Управление задачами</h3>
          <p>Отслеживайте задачи и их статус выполнения</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Командная работа</h3>
          <p>Сотрудничайте с командой в реальном времени</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Аналитика</h3>
          <p>Получайте статистику по проектам и задачам</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Начните работу прямо сейчас</h2>
        <div className="cta-buttons">
          {isAuthenticated ? (
            <>
              <button className="btn btn-primary btn-large" onClick={() => navigate('/projects')}>
                Создать проект
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => navigate('/tasks')}>
                Просмотреть задачи
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary btn-large" onClick={() => navigate('/auth')}>
                Войти в систему
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => navigate('/auth')}>
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
