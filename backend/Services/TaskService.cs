using Microsoft.EntityFrameworkCore;
using PizzaProject.Api.Data;
using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public class TaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            return await _context.TaskItems.AsNoTracking().ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _context.TaskItems.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<TaskItem>> GetByProjectAsync(int projectId)
        {
            return await _context.TaskItems
                .AsNoTracking()
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            var project = await _context.Projects.FindAsync(task.ProjectId);
            if (project == null)
                throw new ArgumentException("Проект не найден");

            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateAsync(int id, TaskItem updated)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;

            var project = await _context.Projects.FindAsync(updated.ProjectId);
            if (project == null)
                throw new ArgumentException("Проект не найден");

            task.Title = updated.Title;
            task.Description = updated.Description;
            task.Status = updated.Status;
            task.DueDate = updated.DueDate;
            task.AssignedTo = updated.AssignedTo;
            task.ProjectId = updated.ProjectId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStatusAsync(int id, string status)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;

            task.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;

            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
