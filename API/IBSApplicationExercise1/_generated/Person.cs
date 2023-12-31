﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IBSApplicationExercise1._generated
{
    [Index("Email", Name = "UQ__People__AB6E616436930FE2", IsUnique = true)]
    public partial class Person
    {
        public Person()
        {
            DepartmentAssignments = new HashSet<DepartmentAssignment>();
        }

        [Key]
        [Column("personID")]
        public Guid PersonId { get; set; }
        [Required]
        [Column("email")]
        [StringLength(50)]
        [Unicode(false)]
        public string Email { get; set; }
        [Required]
        [Column("firstName")]
        [StringLength(50)]
        [Unicode(false)]
        public string FirstName { get; set; }
        [Required]
        [Column("lastName")]
        [StringLength(50)]
        [Unicode(false)]
        public string LastName { get; set; }
        [Column("phoneNumber")]
        [StringLength(50)]
        [Unicode(false)]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// 1=active, 0=inactive
        /// </summary>
        [Column("active")]
        public bool Active { get; set; }
        [Column("startDate", TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column("endDate", TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        [Column("createdBy")]
        [StringLength(100)]
        [Unicode(false)]
        public string CreatedBy { get; set; }
        [Column("createdDate", TypeName = "datetime")]
        public DateTime CreatedDate { get; set; }
        [Column("modifiedBy")]
        [StringLength(100)]
        [Unicode(false)]
        public string ModifiedBy { get; set; }
        [Column("modifiedDate", TypeName = "datetime")]
        public DateTime ModifiedDate { get; set; }

        [InverseProperty("Person")]
        public virtual ICollection<DepartmentAssignment> DepartmentAssignments { get; set; }
    }
}