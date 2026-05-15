import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Pizza Project</h1>
        <p>Система управления проектами и задачами в службе доставки пиццы</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Управление проектами</h3>
          <p>Создавайте и управляйте проектами доставки пиццы</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📌</div>
          <h3>Kanban-доска</h3>
          <p>Отслеживайте задачи по статусам: Запланировано, В работе, Выполнено</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Командная работа</h3>
          <p>Назначайте задачи участникам команды</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Отчётность</h3>
          <p>Получайте статистику по проектам и задачам</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Начните работу прямо сейчас</h2>
        <div className="cta-buttons">
          <Link to="/projects" className="btn btn-primary btn-large">Проекты</Link>
          <Link to="/tasks" className="btn btn-secondary btn-large">Задачи</Link>
        </div>
      </div>
    </div>
  );
}
