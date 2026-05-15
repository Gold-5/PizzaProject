# Структура проекта Pizza Project

## Структура

```
PizzaProject/
│
├── frontend/                    ← React + Vite приложение
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── router/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/                     ← ASP.NET Core Web API
    ├── Controllers/
    │   ├── AuthController.cs
    │   ├── ProjectsController.cs
    │   └── TasksController.cs
    ├── Models/
    │   ├── User.cs
    │   ├── Project.cs
    │   └── TaskItem.cs
    ├── Services/
    │   ├── AuthService.cs
    │   ├── ProjectService.cs
    │   └── TaskService.cs
    ├── Data/
    │   ├── ApplicationDbContext.cs
    │   └── SeedData.cs
    ├── Migrations/
    ├── Program.cs
    ├── PizzaProject.Api.csproj
    ├── appsettings.json
    └── README.md
```

## Технологии

### Frontend
- React 18 + Vite
- `npm run dev` — запуск (http://localhost:3000)

### Backend
- ASP.NET Core 10.0 Web API
- Entity Framework Core + SQL Server
- `dotnet run` — запуск

## API интеграция

```
Frontend:   http://localhost:3000
Backend:    http://localhost:5035/api
```

## Быстрый старт

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
dotnet run
```
