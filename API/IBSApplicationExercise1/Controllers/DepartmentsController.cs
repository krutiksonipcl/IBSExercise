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
        private readonly IBSApplicationExerciseContext _context;

        public DepartmentsController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartment()
        {
          if (_context.Department == null)
          {
              return NotFound();
          }
            return await _context.Department.ToListAsync();
        }

        // GET: api/Departments/5
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

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{DepartmentID}")]
        public async Task<IActionResult> PutDepartment(Guid DepartmentID, Department department)
        {
            if (DepartmentID != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(DepartmentID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
          if (_context.Department == null)
          {
              return Problem("Entity set 'IBSApplicationExerciseContext.Department'  is null.");
          }
            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { DepartmentID = department.DepartmentId }, department);
        }

        // DELETE: api/Departments/5
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

        private bool DepartmentExists(Guid id)
        {
            return (_context.Department?.Any(e => e.DepartmentId == id)).GetValueOrDefault();
        }
    }
}
