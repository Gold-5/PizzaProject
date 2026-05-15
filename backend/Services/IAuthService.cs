using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(string username, string email, string password);
        Task<User?> LoginAsync(string email, string password);
        User? GetUserById(int id);
    }
}