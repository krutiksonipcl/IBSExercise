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
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPut("{DepartmentID}")]
        public async Task<IActionResult> PutDepartment(Guid DepartmentID, Department department)
        {
            Console.Write("Hello, ");
            if (DepartmentID != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            
            return NoContent();
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
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
          if (_context.Department == null)
          {
              return Problem("Entity set " + nameof(IBSApplicationExerciseContext.Department) + " is null.");
          }
            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { DepartmentID = department.DepartmentId }, department);
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
