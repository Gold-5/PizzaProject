using PizzaProject.Api.DTOs;

namespace PizzaProject.Api.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllAsync();
        Task<TaskDto?> GetByIdAsync(int id);
        Task<IEnumerable<TaskDto>> GetByProjectAsync(int projectId);
        Task<TaskDto> CreateAsync(CreateTaskDto dto);
        Task<bool> UpdateAsync(int id, CreateTaskDto dto);
        Task<bool> DeleteAsync(int id);
    }
}