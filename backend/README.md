# PizzaProject.Api

Backend Web API for coursework: Pizza delivery projects management.

Features:
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core (Code First)
- SQL Server
- JWT Authentication (register/login)
- Projects and Tasks management
- Swagger

Connection string: configured in `appsettings.json` (DefaultConnection)

To run:
1. Update connection string if necessary.
2. Open in Visual Studio and run.
3. The app will apply migrations and seed data on startup.

API endpoints:
- GET /api/projects
- GET /api/projects/{id}
- POST /api/projects
- PUT /api/projects/{id}
- DELETE /api/projects/{id}

- GET /api/tasks
- GET /api/tasks/{id}
- GET /api/tasks/by-project/{projectId}
- POST /api/tasks
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

- POST /api/auth/register
- POST /api/auth/login

