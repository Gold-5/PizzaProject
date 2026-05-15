# PizzaProject.Api

Backend Web API для курсовой работы: управление проектами и задачами в службе доставки пиццы.

Технологии:
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core (Code First)
- SQL Server

Строка подключения: настраивается в `appsettings.json` (DefaultConnection)

## Запуск

1. Убедитесь что SQL Server запущен.
2. При необходимости обновите строку подключения в `appsettings.json`.
3. Выполните: `dotnet run`
4. Миграции и seed-данные применяются автоматически при запуске.

## Модели

**User** — Id, Username, Email, Password, Role
**Project** — Id, Name, Description, StartDate, EndDate
**TaskItem** — Id, Title, Description, Status, CreatedAt, DueDate, AssignedTo, ProjectId

## Kanban-статусы задач

- Запланировано
- В работе
- Выполнено

## API endpoints

### Авторизация
- `POST /api/auth/register` — регистрация пользователя
- `POST /api/auth/login` — авторизация пользователя

### Проекты (CRUD)
- `GET /api/projects` — все проекты
- `GET /api/projects/{id}` — проект по ID
- `POST /api/projects` — создать проект
- `PUT /api/projects/{id}` — обновить проект
- `DELETE /api/projects/{id}` — удалить проект

### Задачи (CRUD + Kanban)
- `GET /api/tasks` — все задачи
- `GET /api/tasks/{id}` — задача по ID
- `GET /api/tasks/by-project/{projectId}` — задачи проекта
- `POST /api/tasks` — создать задачу
- `PUT /api/tasks/{id}` — обновить задачу
- `PATCH /api/tasks/{id}/status` — изменить статус задачи
- `DELETE /api/tasks/{id}` — удалить задачу
