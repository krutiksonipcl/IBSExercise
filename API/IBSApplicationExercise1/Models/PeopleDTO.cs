namespace IBSApplicationExercise1.Models
{
    public class PeopleDTO
    {
        public Guid PersonId { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        /// <summary>
        /// 1=active, 0=inactive
        /// </summary>
        public bool? Active { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
