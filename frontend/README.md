# Pizza Project Frontend

React + Vite frontend приложение для системы управления проектами доставки пиццы.

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`

## Сборка для production

```bash
npm run build
```

## Структура проекта

```
src/
├── api/              # HTTP клиент и API запросы
├── components/       # React компоненты
├── pages/            # Страницы приложения
├── layouts/          # Макеты (шаблоны) страниц
├── services/         # Бизнес-логика сервисов
├── styles/           # Глобальные стили
├── hooks/            # Custom React хуки
├── context/          # React Context для управления состоянием
├── utils/            # Утилиты и вспомогательные функции
├── App.jsx           # Главный компонент приложения
└── main.jsx          # Точка входа
```

## API Backend

Backend API расположен на `https://localhost:7001/api`

При запуске в режиме разработки используется proxy через Vite для избежания CORS проблем.

## Конфигурация окружения

- `.env` - переменные для production
- `.env.development` - переменные для разработки
- `.env.production` - переменные для production сборки

## Технологии

- **React 18** - UI библиотека
- **Vite** - bundler и dev сервер
- **React Router DOM** - маршрутизация
- **Axios** - HTTP клиент
