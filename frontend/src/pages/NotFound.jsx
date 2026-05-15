import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <a href="/" className="btn btn-primary">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
