# Pizza Project Frontend

Современный React + Vite frontend для системы управления проектами доставки пиццы.

## Структура проекта

```
src/
├── api/                    # HTTP клиент и API endpoints
│   ├── axiosConfig.js      # Конфигурация axios с interceptors
│   └── endpoints.js        # API endpoints
├── components/             # React компоненты
│   ├── Layout.jsx          # Главный layout
│   ├── Navigation.jsx      # Навигация
│   ├── LoadingSpinner.jsx  # Спиннер загрузки
│   └── ErrorMessage.jsx    # Компонент ошибок
├── pages/                  # Страницы приложения
│   ├── Home.jsx            # Главная страница
│   ├── Projects.jsx        # Страница проектов
│   ├── Tasks.jsx           # Страница задач
│   ├── Auth.jsx            # Страница авторизации
│   └── NotFound.jsx        # Страница 404
├── layouts/                # Макеты страниц (расширяемо)
├── services/               # Бизнес-логика
│   ├── authService.js      # Сервис аутентификации
│   └── dataService.js      # Сервис работы с данными
├── context/                # React Context
│   └── AuthContext.jsx     # Контекст для авторизации
├── hooks/                  # Custom React хуки
│   ├── useAuth.js          # Хук для работы с авторизацией
│   └── useAsync.js         # Хук для async операций
├── utils/                  # Утилиты и помощники
│   └── helpers.js          # Вспомогательные функции
├── styles/                 # CSS стили
│   ├── index.css           # Глобальные стили
│   ├── Navigation.css
│   ├── Layout.css
│   ├── Home.css
│   ├── Projects.css
│   ├── Tasks.css
│   ├── Auth.css
│   └── NotFound.css
├── router/                 # Маршрутизация
│   └── index.jsx           # React Router конфигурация
├── App.jsx                 # Главный компонент
└── main.jsx                # Точка входа
```

## Установка

```bash
npm install
```

## Запуск

### Развитие

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`

### Продакшн сборка

```bash
npm run build
```

### Предпросмотр сборки

```bash
npm run preview
```

## Конфигурация

### Переменные окружения

Файлы конфигурации:

- `.env` - основной конфиг
- `.env.development` - для разработки
- `.env.production` - для продакшена

Переменные:

```
VITE_API_BASE_URL=https://localhost:7001/api
```

### Proxy конфигурация

В `vite.config.js` настроен proxy для избежания CORS проблем при разработке:

```javascript
proxy: {
  '/api': {
    target: 'https://localhost:7001',
    changeOrigin: true,
    secure: false
  }
}
```

## API интеграция

### Запросы

Все HTTP запросы выполняются через `axios` клиент:

```javascript
import { projectsApi, tasksApi, authApi } from '@/api/endpoints';

// Projects
const projects = await projectsApi.getAll();
const project = await projectsApi.getById(id);
await projectsApi.create(data);
await projectsApi.update(id, data);
await projectsApi.delete(id);

// Tasks
const tasks = await tasksApi.getAll();
const task = await tasksApi.getById(id);
await tasksApi.create(data);
await tasksApi.update(id, data);
await tasksApi.delete(id);

// Auth
await authApi.register(data);
await authApi.login(data);
await authApi.logout();
```

### Обработка ошибок

Axios настроен с interceptors для обработки ошибок и автоматической отправки токена авторизации.

```javascript
// Автоматически добавляет токен в headers
// Обрабатывает 401 ошибки (неавторизованный доступ)
```

## Компоненты

### Layout

Основной layout с навигацией и footer

### Navigation

Навигационное меню приложения

### LoadingSpinner

Спиннер загрузки данных

### ErrorMessage

Компонент для отображения ошибок

## Страницы

### Home

Главная страница с описанием функционала

### Projects

Список проектов с возможностью создания, редактирования и удаления

### Tasks

Список задач с фильтрацией и управлением статусом

### Auth

Страница авторизации и регистрации

## Hooks

### useAuth

```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

### useAsync

```javascript
const { execute, status, value, error } = useAsync(asyncFunction);
```

## Стили

Проект использует CSS modules и глобальные стили с CSS переменными для теминга:

```css
--primary-color: #ff6b35 --secondary-color: #004e89 --accent-color: #f7b801 --success-color: #06a77d
  --error-color: #d62828;
```

## Браузеры

Поддерживаемые браузеры:

- Chrome (последняя версия)
- Firefox (последняя версия)
- Safari (последняя версия)
- Edge (последняя версия)

## Технологии

- React 18.3.1
- React Router DOM 6.20.0
- Axios 1.6.2
- Vite 5.0.8
- CSS3

## Лицензия

MIT
