using Microsoft.AspNetCore.Mvc;
using PizzaProject.Api.Models;
using PizzaProject.Api.Services;

namespace PizzaProject.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _projectService.GetAllAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var project = await _projectService.GetByIdAsync(id);
            if (project == null) 
                return NotFound(new { error = "Проект не найден" });
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var created = await _projectService.CreateAsync(project);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Project projectData)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var updated = await _projectService.UpdateAsync(id, projectData);
            if (!updated) 
                return NotFound(new { error = "Проект не найден" });

            return Ok(new { message = "Проект обновлён" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _projectService.DeleteAsync(id);
            if (!deleted) 
                return NotFound(new { error = "Проект не найден" });

            return Ok(new { message = "Проект удалён" });
        }
    }
}