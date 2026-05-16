import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/endpoints';
import '../styles/Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authApi.login({ email, password });
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        const response = await authApi.register({ email, password, username: name });
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка аутентификации');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isLogin ? 'Вход в систему' : 'Регистрация'}</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ваше имя"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {error && <div className="error-message-auth">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? 'Нет учетной записи?' : 'Уже есть учетная запись?'}
              <button
                type="button"
                className="toggle-link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
              >
                {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
