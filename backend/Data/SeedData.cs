using Microsoft.AspNetCore.Identity;
using PizzaProject.Api.Models;

namespace PizzaProject.Api.Data
{
    public static class SeedData
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            if (!context.Projects.Any())
            {
                var p1 = new Project { Name = "Delivery Backend", Description = "API for managing orders and deliveries" };
                var p2 = new Project { Name = "Mobile App", Description = "Customer mobile application" };
                context.Projects.AddRange(p1, p2);
                await context.SaveChangesAsync();

                context.TaskItems.AddRange(
                    new TaskItem { Title = "Design DB schema", Description = "Create initial schema", ProjectId = p1.Id },
                    new TaskItem { Title = "Implement auth", Description = "JWT authentication", ProjectId = p1.Id },
                    new TaskItem { Title = "Create UI mockups", Description = "Design mobile UI", ProjectId = p2.Id }
                );
                await context.SaveChangesAsync();
             }

             if (!userManager.Users.Any())
             {
                 var user = new ApplicationUser { UserName = "admin@pizza.local", Email = "admin@pizza.local", FullName = "Admin" };
                 await userManager.CreateAsync(user, "Password123");
             }
         }
     }
 }
