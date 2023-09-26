using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBSApplicationExercise1.Models;
using NuGet.Protocol;

namespace IBSApplicationExercise1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {   
        #region init
        private readonly IBSApplicationExerciseContext _context;

        public DepartmentsController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }
        #endregion

        #region get
        // GET: api/Departments
        /// <summary>
        /// returns list of each row in the table Department
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDTO>>> GetDepartment()
        {

            if (_context.Department == null) {
                return NotFound();
            }

            if (!_context.Department.Any()) {
                return NotFound();
            }

            return await _context.Department.Select(x => new DepartmentDTO
            {
                DepartmentId = x.DepartmentId,
                DepartmentName = x.DepartmentName,
                AbbrDepartmentName = x.AbbrDepartmentName,

            }).ToListAsync();
        }

        // GET: api/Departments/5
        /// <summary>
        /// returns the row for the specified DepartmentID if found
        /// otherwise returns NotFound() which is a 404 status code
        /// </summary>
        /// <param name="DepartmentID"></param>
        /// <returns></returns>
        [HttpGet("{DepartmentID}")]
        public async Task<ActionResult<Department>> GetDepartment(Guid DepartmentID)
        {
            if (_context.Department == null)
            {
                return NotFound();
            }
            var department = await _context.Department.FindAsync(DepartmentID);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }
        #endregion

        #region put
        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to add a new row into the Department table
        /// </summary>
        /// <param name="DepartmentID"></param>
        /// <param name="updatedDepartment">The new department row to be inserted</param>
        /// <returns></returns>
        [HttpPut("{DepartmentID}")]
        public async Task<DepartmentDTO> PutDepartment(Guid DepartmentID, DepartmentDTO updatedDepartment)
        {
            Department recordToUpdate = await (from department in _context.Department
                                               where department.DepartmentId == updatedDepartment.DepartmentId
                                               select department).FirstAsync();

            recordToUpdate.DepartmentId = DepartmentID;
            recordToUpdate.DepartmentName = updatedDepartment.DepartmentName ?? recordToUpdate.DepartmentName;
            recordToUpdate.AbbrDepartmentName = updatedDepartment.AbbrDepartmentName ?? recordToUpdate.AbbrDepartmentName;
            recordToUpdate.CreatedBy = "Krutik Soni";
            recordToUpdate.CreatedDate = recordToUpdate.CreatedDate;
            recordToUpdate.ModifiedBy = "Krutik Soni";
            recordToUpdate.ModifiedDate = recordToUpdate.ModifiedDate;



            _context.UpdateRange(recordToUpdate);
            await _context.SaveChangesAsync();
            return updatedDepartment;
            // return the object back (good practice)

        }
        #endregion

        #region post
        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to update a row into the Department table
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(DepartmentDTO newDepartment)
        { 
            if (_context.Department == null)
            {
                return Problem("Entity set " + nameof(IBSApplicationExerciseContext.Department) + " is null.");
            }

            var addDepartment = new Department()
            {
                DepartmentName = newDepartment.DepartmentName,
                AbbrDepartmentName = newDepartment.AbbrDepartmentName,
                CreatedBy = "Krutik Soni",
                ModifiedBy = "Krutik Soni"
            };

            /*recordToAdd.DepartmentName = newDepartment.DepartmentName;
            recordToAdd.AbbrDepartmentName = newDepartment.AbbrDepartmentName;
            recordToAdd.CreatedBy = "Krutik Soni";
            recordToAdd.ModifiedBy = "Krutik Soni";*/
            _context.Department.Add(addDepartment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartment), new { DepartmentID = newDepartment.DepartmentId }, newDepartment);
            
        }
        #endregion



        #region delete
        // DELETE: api/Departments/5
        /// <summary>
        /// used to delete rows in the Department table by using the Department
        /// </summary>
        /// <param name="DepartmentID">id used to delete that department/row from the table</param>
        /// <returns></returns>
        [HttpDelete("{DepartmentID}")]
        public async Task<IActionResult> DeleteDepartment(Guid DepartmentID)
        {
            if (_context.Department == null)
            {
                return NotFound();
            }
            var department = await _context.Department.FindAsync(DepartmentID);
            if (department == null)
            {
                return NotFound();
            }

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region helper function to check if a department exists
        /// <summary>
        /// Checks if the assignmentID exists in the DepartmentAssignment Table
        /// </summary>
        /// <param name="DepartmentID"></param>
        /// <returns></returns>
        private bool DepartmentExists(Guid DepartmentID)
        {
            return (_context.Department?.Any(e => e.DepartmentId == DepartmentID)).GetValueOrDefault();
        }
        #endregion
    }
}
