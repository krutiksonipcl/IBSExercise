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

        /// <summary>
        /// GET: api/DepartmentAssignments
        /// returns list of each row in the table DepartmentAssignment
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentAssignment>>> GetDepartmentAssignment()
        {
          if (_context.DepartmentAssignments == null)
          {
              return NotFound();
          }
          if (!_context.DepartmentAssignments.Any())
            {
                return NotFound();
            }
            return await _context.DepartmentAssignments.ToListAsync();
        }


        #endregion


        #region post
        /// <summary>
        /// POST: api/DepartmentAssignments
        /// used to assign an existing user to an existing 
        /// if not found, returns 404 
        /// </summary>
        /// <param name="departmentAssignment"> the data from the front end to be set into the DepartmentAssignment table</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<DepartmentAssignment>> PostDepartmentAssignment(DepartmentAssignmentDTO newDepartmentAssignment)
        {
            if (_context.DepartmentAssignments == null)
            {
                return Problem("Entity set " + nameof(IBSApplicationExerciseContext.DepartmentAssignments) + " is null.");
            }

            var department = await _context.Departments.FindAsync(newDepartmentAssignment.DepartmentId);
            if (department == null) { return NotFound(); };

            var people = await _context.People.FindAsync(newDepartmentAssignment.PersonId);
            if (people == null) { return NotFound(); }


            var addDepartmentAssignment = new DepartmentAssignment()
            {
                DepartmentId = department.DepartmentId,
                PersonId = people.PersonId,
                DepartmentName = department.DepartmentName,
                FirstName = people.FirstName,
                LastName = people.LastName,
                Email = people.Email,
                CreatedBy = "Krutik Soni",
                ModifiedBy = "Krutik Soni"
            };


            _context.DepartmentAssignments.Add(addDepartmentAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentAssignment", new { AssignmentID = newDepartmentAssignment.AssignmentId }, newDepartmentAssignment);
        }
        #endregion

        #region delete

        /// <summary>
        /// DELETE: api/DepartmentAssignments
        /// deletes the row from DepartmentAssignments that matches the id AssignmentID given by the user
        /// </summary>
        /// <param name="AssignmentID">ID and primary key in the DepartmentAssignment Table</param>
        /// <returns></returns>
        [HttpDelete("{AssignmentID}")]
        public async Task<IActionResult> DeleteDepartmentAssignment(Guid AssignmentID)
        {
            if (_context.DepartmentAssignments == null)
            {
                return NotFound();
            }

            var departmentAssignment = await _context.DepartmentAssignments.FindAsync(AssignmentID);

            if (departmentAssignment == null)
            {
                return NotFound();
            }

            _context.DepartmentAssignments.Remove(departmentAssignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion
    }
}
