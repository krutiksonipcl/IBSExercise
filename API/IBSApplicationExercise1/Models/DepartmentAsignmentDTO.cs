namespace IBSApplicationExercise1.Models
{
    public class DepartmentAssignmentDTO
    {
        public Guid AssignmentId { get; set; }
        public Guid PeopleId { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual Department Department { get; set; }

        public virtual People People { get; set; }
    }
}
