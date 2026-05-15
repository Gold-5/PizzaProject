using PizzaProject.Api.Models;
using System.Security.Cryptography;
using System.Text;

namespace PizzaProject.Api.Data
{
    public static class SeedData
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Seed Users
            if (!context.Users.Any())
            {
                var user = new User
                {
                    Username = "admin",
                    Email = "admin@pizza.local",
                    PasswordHash = HashPassword("Password123"),
                    Role = "Admin"
                };
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }

            // Seed Projects
            if (!context.Projects.Any())
            {
                var p1 = new Project
                {
                    Name = "Delivery Backend",
                    Description = "API для управления заказами и доставками",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddMonths(3)
                };

                var p2 = new Project
                {
                    Name = "Mobile App",
                    Description = "Мобильное приложение для клиентов",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddMonths(6)
                };

                context.Projects.AddRange(p1, p2);
                await context.SaveChangesAsync();

                // Seed Tasks
                context.TaskItems.AddRange(
                    new TaskItem
                    {
                        Title = "Дизайн схемы БД",
                        Description = "Создать начальную схему БД",
                        Status = "Выполнено",
                        ProjectId = p1.Id,
                        CreatedAt = DateTime.Now
                    },
                    new TaskItem
                    {
                        Title = "Реализовать авторизацию",
                        Description = "Система авторизации через Session",
                        Status = "В работе",
                        ProjectId = p1.Id,
                        CreatedAt = DateTime.Now
                    },
                    new TaskItem
                    {
                        Title = "Создать UI макеты",
                        Description = "Дизайн мобильного интерфейса",
                        Status = "Запланировано",
                        ProjectId = p2.Id,
                        CreatedAt = DateTime.Now
                    }
                );
                await context.SaveChangesAsync();
            }
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
