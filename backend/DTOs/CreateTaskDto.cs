using System.ComponentModel.DataAnnotations;

namespace PizzaProject.Api.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        [Required]
        public int ProjectId { get; set; }
    }
}