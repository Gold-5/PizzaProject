using Microsoft.EntityFrameworkCore;
using PizzaProject.Api.Data;
using PizzaProject.Api.DTOs;
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

        public async Task<TaskDto> CreateAsync(CreateTaskDto dto)
        {
            var project = await _context.Projects.FindAsync(dto.ProjectId);
            if (project == null) throw new ArgumentException("Project not found");

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                ProjectId = dto.ProjectId
            };

            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                ProjectId = task.ProjectId,
                CreatedAt = task.CreatedAt
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;
            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<TaskDto>> GetAllAsync()
        {
            return await _context.TaskItems
                .AsNoTracking()
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    ProjectId = t.ProjectId,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<TaskDto?> GetByIdAsync(int id)
        {
            var t = await _context.TaskItems.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (t == null) return null;
            return new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                ProjectId = t.ProjectId,
                CreatedAt = t.CreatedAt
            };
        }

        public async Task<IEnumerable<TaskDto>> GetByProjectAsync(int projectId)
        {
            return await _context.TaskItems
                .AsNoTracking()
                .Where(t => t.ProjectId == projectId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    ProjectId = t.ProjectId,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(int id, CreateTaskDto dto)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return false;
            var project = await _context.Projects.FindAsync(dto.ProjectId);
            if (project == null) throw new ArgumentException("Project not found");

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.ProjectId = dto.ProjectId;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}