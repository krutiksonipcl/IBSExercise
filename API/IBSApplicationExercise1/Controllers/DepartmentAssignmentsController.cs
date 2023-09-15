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
        private readonly IBSApplicationExerciseContext _context;

        public DepartmentAssignmentsController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }

        // GET: api/DepartmentAssignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentAssignment>>> GetDepartmentAssignment()
        {
          if (_context.DepartmentAssignment == null)
          {
              return NotFound();
          }
            return await _context.DepartmentAssignment.ToListAsync();
        }

        // GET: api/DepartmentAssignments/5
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

        // PUT: api/DepartmentAssignments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{AssignmentID}")]
        public async Task<IActionResult> PutDepartmentAssignment(Guid AssignmentID, DepartmentAssignment departmentAssignment)
        {
            if (AssignmentID != departmentAssignment.AssignmentId)
            {
                return BadRequest();
            }

            _context.Entry(departmentAssignment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentAssignmentExists(AssignmentID))
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

        // POST: api/DepartmentAssignments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DepartmentAssignment>> PostDepartmentAssignment(DepartmentAssignment departmentAssignment)
        {
          if (_context.DepartmentAssignment == null)
          {
              return Problem("Entity set 'IBSApplicationExerciseContext.DepartmentAssignment'  is null.");
          }
            _context.DepartmentAssignment.Add(departmentAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentAssignment", new { AssignmentID = departmentAssignment.AssignmentId }, departmentAssignment);
        }

        // DELETE: api/DepartmentAssignments/5
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

        private bool DepartmentAssignmentExists(Guid AssignmentID)
        {
            return (_context.DepartmentAssignment?.Any(e => e.AssignmentId == AssignmentID)).GetValueOrDefault();
        }
    }
}
