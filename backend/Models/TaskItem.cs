using System.ComponentModel.DataAnnotations;

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
        public string Status { get; set; } = "Запланировано"; // Запланировано, В работе, Выполнено

        public int? AssignedToId { get; set; }
        public User? AssignedTo { get; set; }

        public int ProjectId { get; set; }
        public Project? Project { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
    }
}