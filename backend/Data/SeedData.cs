using PizzaProject.Api.Models;

namespace PizzaProject.Api.Data
{
    public static class SeedData
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                context.Users.Add(new User
                {
                    Username = "admin",
                    Email = "admin@pizza.local",
                    Password = "Password123",
                    Role = "Admin"
                });
                await context.SaveChangesAsync();
            }

            if (!context.Projects.Any())
            {
                var p1 = new Project
                {
                    Name = "Доставка пиццы",
                    Description = "Управление заказами и доставкой пиццы",
                    StartDate = DateTime.UtcNow
                };
                var p2 = new Project
                {
                    Name = "Мобильное приложение",
                    Description = "Мобильное приложение для клиентов",
                    StartDate = DateTime.UtcNow
                };
                context.Projects.AddRange(p1, p2);
                await context.SaveChangesAsync();

                context.TaskItems.AddRange(
                    new TaskItem
                    {
                        Title = "Создать схему БД",
                        Description = "Начальная схема базы данных",
                        Status = "Выполнено",
                        ProjectId = p1.Id
                    },
                    new TaskItem
                    {
                        Title = "Реализовать авторизацию",
                        Description = "Авторизация пользователей",
                        Status = "В работе",
                        ProjectId = p1.Id
                    },
                    new TaskItem
                    {
                        Title = "Создать UI макеты",
                        Description = "Дизайн мобильного UI",
                        Status = "Запланировано",
                        ProjectId = p2.Id
                    }
                );
                await context.SaveChangesAsync();
            }
        }
    }
}
