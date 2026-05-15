## Шпаргалка по разработке

### Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev сервера (http://localhost:3000)
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

### Структура папок

```
src/
├── api/          → HTTP клиент и endpoints
├── components/   → Переиспользуемые компоненты
├── pages/        → Страницы приложения
├── services/     → Бизнес-логика
├── hooks/        → Custom React hooks
├── context/      → React Context
├── utils/        → Утилиты и helpers
├── styles/       → CSS стили
└── router/       → Маршрутизация
```

### API запросы

```javascript
import { projectsApi, tasksApi } from '@/api/endpoints';

// Получить все проекты
const projects = await projectsApi.getAll();

// Создать новый проект
await projectsApi.create({ name: 'Новый проект', description: '...' });
```

### Использование Auth Context

```javascript
import { useAuth } from '@/hooks/useAuth';

export default function Component() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <>{isAuthenticated ? <p>Добро пожаловать, {user.name}!</p> : <p>Пожалуйста, войдите</p>}</>
  );
}
```

### Обработка ошибок

```javascript
import { getErrorMessage } from '@/utils/helpers';

try {
  await apiCall();
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message);
}
```

### Работа с localStorage

```javascript
import { setLocalStorage, getLocalStorage } from '@/utils/helpers';

// Сохранить
setLocalStorage('key', { data: 'value' });

// Получить
const data = getLocalStorage('key');
```

### Переменные окружения

```javascript
// Доступ к переменным окружения
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Форматирование дат

```javascript
import { formatDate, formatDateTime } from '@/utils/helpers';

const date = formatDate('2026-05-15'); // 15 мая 2026 г.
const dateTime = formatDateTime('2026-05-15T10:30:00');
```

### Валидация

```javascript
import { validateEmail, validatePassword } from '@/utils/helpers';

const isValidEmail = validateEmail('user@example.com'); // true/false
const isValidPassword = validatePassword('password123'); // true/false
```

### Создание новой страницы

1. Создать файл в `src/pages/MyPage.jsx`
2. Добавить маршрут в `src/router/index.jsx`
3. Добавить ссылку в `src/components/Navigation.jsx`

```javascript
// pages/MyPage.jsx
export default function MyPage() {
  return <div>Моя страница</div>;
}
```

```javascript
// router/index.jsx
{
  path: 'my-page',
  element: <MyPage />,
}
```

### Создание нового компонента

```javascript
// components/MyComponent.jsx
export default function MyComponent({ title, onAction }) {
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={onAction}>Действие</button>
    </div>
  );
}
```

### Создание custom hook

```javascript
// hooks/useMyHook.js
import { useState } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);

  const action = () => {
    setState('new value');
  };

  return { state, action };
}
```

### Переменные CSS

```css
:root {
  --primary-color: #ff6b35;
  --secondary-color: #004e89;
  --success-color: #06a77d;
  --error-color: #d62828;
  --border-radius: 8px;
}

.element {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
```

### Отладка

```javascript
// Console logs
console.log('message', data);
console.warn('warning');
console.error('error');

// React DevTools
// Установить расширение в браузер для отладки компонентов

// Network tab
// Проверить HTTP запросы в DevTools
```

### CORS проблемы

При разработке используется proxy в Vite, поэтому CORS обычно не проблема. Если проблемы возникают:

1. Убедиться, что backend настроен для CORS
2. Проверить URL в .env файле
3. Проверить Vite proxy конфигурацию в `vite.config.js`
