using System.ComponentModel.DataAnnotations;

namespace PizzaProject.Api.DTOs
{
    public class CreateProjectDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
    }
}