using Microsoft.EntityFrameworkCore;
using PizzaProject.Api.Data;
using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> CreateAsync(TaskItem taskItem)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == taskItem.ProjectId);
            if (!projectExists) 
                throw new ArgumentException("Проект не найден");

            taskItem.CreatedAt = DateTime.UtcNow;
            taskItem.Status = "Запланировано";

            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();

            return taskItem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            return await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.AssignedTo)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.AssignedTo)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<TaskItem>> GetByProjectAsync(int projectId)
        {
            return await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.AssignedTo)
                .Where(t => t.ProjectId == projectId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(int id, TaskItem taskData)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;

            task.Title = taskData.Title;
            task.Description = taskData.Description;
            task.Status = taskData.Status;
            task.AssignedToId = taskData.AssignedToId;
            task.DueDate = taskData.DueDate;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStatusAsync(int id, string status)
        {
            var validStatuses = new[] { "Запланировано", "В работе", "Выполнено" };
            if (!validStatuses.Contains(status))
                throw new ArgumentException("Неверный статус");

            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;

            task.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}