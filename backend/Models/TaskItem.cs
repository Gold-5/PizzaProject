using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PizzaProject.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Запланировано";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        public string? AssignedTo { get; set; }

        public int ProjectId { get; set; }

        [JsonIgnore]
        public Project? Project { get; set; }
    }
}
