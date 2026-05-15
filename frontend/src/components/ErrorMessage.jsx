import './ErrorMessage.css';

export default function ErrorMessage({ error, onClose }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p>{error?.message || 'Произошла ошибка'}</p>
        {onClose && (
          <button className="error-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
