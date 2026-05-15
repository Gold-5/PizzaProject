using PizzaProject.Api.Data;
using PizzaProject.Api.Models;
using System.Security.Cryptography;
using System.Text;

namespace PizzaProject.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> RegisterAsync(string username, string email, string password)
        {
            // Проверяем, существует ли пользователь
            if (_context.Users.Any(u => u.Email == email))
                throw new ArgumentException("Email уже зарегистрирован");

            if (_context.Users.Any(u => u.Username == username))
                throw new ArgumentException("Пользователь с таким именем уже существует");

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = HashPassword(password),
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
                throw new ArgumentException("Неверные учетные данные");

            if (!VerifyPassword(password, user.PasswordHash))
                throw new ArgumentException("Неверные учетные данные");

            return user;
        }

        public User? GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == hash;
        }
    }
}