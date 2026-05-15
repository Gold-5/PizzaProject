using Microsoft.EntityFrameworkCore;
using PizzaProject.Api.Data;
using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterAsync(string username, string email, string password)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (existing != null)
                throw new ArgumentException("Пользователь с таким email уже существует");

            var user = new User
            {
                Username = username,
                Email = email,
                Password = password,
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
                throw new ArgumentException("Неверный email или пароль");

            return user;
        }
    }
}
