using Microsoft.EntityFrameworkCore;
using PizzaProject.Api.Data;
using PizzaProject.Api.Models;

namespace PizzaProject.Api.Services
{
    public class ProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.Projects.AsNoTracking().ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Project> CreateAsync(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<bool> UpdateAsync(int id, Project updated)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            project.Name = updated.Name;
            project.Description = updated.Description;
            project.StartDate = updated.StartDate;
            project.EndDate = updated.EndDate;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
