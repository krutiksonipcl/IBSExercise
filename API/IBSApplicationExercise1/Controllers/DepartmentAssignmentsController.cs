using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBSApplicationExercise1.Models;

namespace IBSApplicationExercise1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentAssignmentsController : ControllerBase
    {

        #region init
        private readonly IBSApplicationExerciseContext _context;

        public DepartmentAssignmentsController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }
        #endregion

        #region get
        // GET: api/DepartmentAssignments
        
        /// <summary>
        /// returns list of each row in the table DepartmentAssignment
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentAssignment>>> GetDepartmentAssignment()
        {
          if (_context.DepartmentAssignment == null)
          {
              return NotFound();
          }
          if (!_context.DepartmentAssignment.Any())
            {
            return NotFound();
          }
            return await _context.DepartmentAssignment.ToListAsync();
        }

        // GET: api/DepartmentAssignments/id
        /// <summary>
        /// returns the row for the specified AssignmentID if found
        /// otherwise returns NotFound() which is a 404 status code
        /// </summary>
        /// <param name="AssignmentID">ID and primary key in the DepartmentAssignment Table</param>
        /// <returns></returns>
        [HttpGet("{AssignmentID}")]
        public async Task<ActionResult<DepartmentAssignment>> GetDepartmentAssignment(Guid AssignmentID)
        {
          if (_context.DepartmentAssignment == null)
          {
              return NotFound();
          }
            var departmentAssignment = await _context.DepartmentAssignment.FindAsync(AssignmentID);

            if (departmentAssignment == null)
            {
                return NotFound();
            }

            return departmentAssignment;
        }
        #endregion

        #region put
        // PUT: api/DepartmentAssignments/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to update a record in DepartmentAssignment table
        /// </summary>
        /// <param name="AssignmentID"></param>
        /// <param name="departmentAssignment"></param>
        /// <returns></returns>
        [HttpPut("{AssignmentID}")]
        public async Task<IActionResult> PutDepartmentAssignment(Guid AssignmentID, DepartmentAssignment departmentAssignment)
        {
            if (AssignmentID != departmentAssignment.AssignmentId)
            {
                return BadRequest();
            }

            _context.Entry(departmentAssignment).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region post
        // POST: api/DepartmentAssignments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to assign an existing user to an existing department
        /// </summary>
        /// <param name="departmentAssignment"> the data from the front end to be set into the DepartmentAssignment table</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<DepartmentAssignment>> PostDepartmentAssignment(DepartmentAssignment newDepartmentAssignment)
        {
            if (_context.DepartmentAssignment == null)
            {
                return Problem("Entity set " + nameof(IBSApplicationExerciseContext.DepartmentAssignment)+ " is null.");
            }


            var department = await _context.Department.FindAsync(new Guid(newDepartmentAssignment.DepartmentName));
            var people = await _context.People.FindAsync(new Guid(newDepartmentAssignment.Email));

            var addDepartmentAssignment = new DepartmentAssignment()
            {
                DepartmentId = department.DepartmentId,
                PeopleId = people.PeopleId,
                DepartmentName = department.DepartmentName,
                FirstName = people.FirstName,
                LastName = people.LastName,
                Email = people.Email,
                CreatedBy = "Krutik Soni",
                ModifiedBy = "Krutik Soni"
            };


            _context.DepartmentAssignment.Add(addDepartmentAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentAssignment", new { AssignmentID = newDepartmentAssignment.AssignmentId }, newDepartmentAssignment);
        }
        #endregion

        #region delete
        // DELETE: api/DepartmentAssignments
        /// <summary>
        /// deletes the row from DepartmentAssignments that matches the id AssignmentID given by the user
        /// </summary>
        /// <param name="AssignmentID">ID and primary key in the DepartmentAssignment Table</param>
        /// <returns></returns>
        [HttpDelete("{AssignmentID}")]
        public async Task<IActionResult> DeleteDepartmentAssignment(Guid AssignmentID)
        {
            if (_context.DepartmentAssignment == null)
            {
                return NotFound();
            }
            var departmentAssignment = await _context.DepartmentAssignment.FindAsync(AssignmentID);
            if (departmentAssignment == null)
            {
                return NotFound();
            }

            _context.DepartmentAssignment.Remove(departmentAssignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Helper method for checking if a department exists
        /// <summary>
        /// Checks if the assignmentID exists in the DepartmentAssignment Table
        /// </summary>
        /// <param name="AssignmentID">ID and primary key in the DepartmentAssignment Table</param>
        /// <returns></returns>
        private bool DepartmentAssignmentExists(Guid AssignmentID)
        {
            return (_context.DepartmentAssignment?.Any(e => e.AssignmentId == AssignmentID)).GetValueOrDefault();
        }
        #endregion
    }
}
