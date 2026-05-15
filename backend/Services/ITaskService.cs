using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(int id);
        Task<List<TaskItem>> GetByProjectAsync(int projectId);
        Task<TaskItem> CreateAsync(TaskItem taskItem);
        Task<bool> UpdateAsync(int id, TaskItem taskItem);
        Task<bool> UpdateStatusAsync(int id, string status);
        Task<bool> DeleteAsync(int id);
    }
}