# 📁 Структура проекта Pizza Project

## Главная папка

```
c:\Users\user\source\repos\PizzaProject\
```

## Структура разделения

```
PizzaProject/
│
├── frontend/                    ← React + Vite приложение
│   ├── src/
│   │   ├── api/                # HTTP клиент (axios, endpoints)
│   │   ├── components/         # React компоненты
│   │   ├── pages/              # Страницы приложения
│   │   ├── services/           # Бизнес-логика
│   │   ├── context/            # React Context
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Утилиты
│   │   ├── styles/             # CSS стили
│   │   ├── router/             # Маршрутизация
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                 # Статические файлы
│   ├── node_modules/           # Зависимости (91 пакет)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env*                   # Переменные окружения
│
└── backend/                     ← ASP.NET Core Web API
    ├── Controllers/            # API контроллеры
    │   ├── AuthController.cs
    │   ├── ProjectsController.cs
    │   ├── TasksController.cs
    │   └── WeatherForecastController.cs
    ├── Models/                 # Модели данных
    │   ├── ApplicationUser.cs
    │   ├── Project.cs
    │   └── TaskItem.cs
    ├── Services/               # Сервисы
    ├── Data/                   # DbContext и миграции
    ├── DTOs/                   # Data Transfer Objects
    ├── Migrations/             # Entity Framework миграции
    ├── Program.cs              # Точка входа
    ├── PizzaProject.Api.csproj # Конфигурация проекта
    ├── appsettings.json
    └── README.md
```

## Пути к папкам

### Frontend

```
c:\Users\user\source\repos\PizzaProject\frontend
```

**Команды:**

- `npm run dev` - запуск dev сервера (http://localhost:3000)
- `npm run build` - сборка для production
- `npm run preview` - предпросмотр сборки

**Технология:** React 18.3.1 + Vite 5.0.8

### Backend

```
c:\Users\user\source\repos\PizzaProject\backend
```

**Команды:**

- `dotnet run` - запуск сервера
- `dotnet build` - сборка проекта

**Технология:** ASP.NET Core 10.0

## API интеграция

**Frontend** подключается к **Backend**:

```
Frontend:   http://localhost:3000
Backend:    https://localhost:7001/api
```

Proxy настроен в `frontend/vite.config.js`:

```javascript
'/api' → 'https://localhost:7001/api'
```

## Файлы для изменения путей

Если нужно обновить пути, отредактируйте:

### Frontend

- `frontend/vite.config.js` - Vite конфигурация и proxy
- `frontend/.env*` - Переменные окружения
- `frontend/src/api/axiosConfig.js` - Базовый URL для API

### Backend

- `backend/Program.cs` - Конфигурация backend
- `backend/appsettings.json` - Настройки приложения

## Быстрый старт

### Запуск Frontend

```bash
cd c:\Users\user\source\repos\PizzaProject\frontend
npm install  # Если ещё не установлено
npm run dev
```

Откройте браузер: `http://localhost:3000`

### Запуск Backend

```bash
cd c:\Users\user\source\repos\PizzaProject\backend
dotnet run
```

Backend будет доступен на: `https://localhost:7001`

## Структура уже готова!

- ✅ Frontend полностью подготовлен (React + Vite)
- ✅ Backend полностью подготовлен (ASP.NET Core)
- ✅ Связь через API настроена
- ✅ Аутентификация готова
- ✅ Структура папок оптимальна

Проект готов к разработке! 🚀
