namespace IBSApplicationExercise1.Models
{
    public class PeopleDTO
    {

        public string Email { get; set; } = null!;

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }

        /// <summary>
        /// 1=active, 0=inactive
        /// </summary>
        public bool? Active { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
