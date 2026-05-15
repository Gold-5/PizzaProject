using Microsoft.AspNetCore.Mvc;
using PizzaProject.Api.Models;
using PizzaProject.Api.Services;

namespace PizzaProject.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task == null) 
                return NotFound(new { error = "Задача не найдена" });
            return Ok(task);
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetByProject(int projectId)
        {
            var tasks = await _taskService.GetByProjectAsync(projectId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem taskItem)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            try
            {
                var created = await _taskService.CreateAsync(taskItem);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem taskData)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            try
            {
                var updated = await _taskService.UpdateAsync(id, taskData);
                if (!updated) 
                    return NotFound(new { error = "Задача не найдена" });

                return Ok(new { message = "Задача обновлена" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusRequest request)
        {
            if (string.IsNullOrEmpty(request.Status))
                return BadRequest(new { error = "Статус не может быть пустым" });

            try
            {
                var updated = await _taskService.UpdateStatusAsync(id, request.Status);
                if (!updated) 
                    return NotFound(new { error = "Задача не найдена" });

                return Ok(new { message = "Статус задачи изменён" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _taskService.DeleteAsync(id);
            if (!deleted) 
                return NotFound(new { error = "Задача не найдена" });

            return Ok(new { message = "Задача удалена" });
        }
    }

    public class StatusRequest
    {
        public string Status { get; set; } = null!;
    }
}