using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBSApplicationExercise1.Models;
using NuGet.Protocol;
using IBSApplicationExercise1.Services;

namespace IBSApplicationExercise1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {   
        #region init
        private readonly IBSApplicationExerciseContext _context;
        private readonly DepartmentService _departmentService;

        public DepartmentsController(IBSApplicationExerciseContext context, DepartmentService departmentService)
        {
            _departmentService = departmentService;
            _context = context;
        }
        #endregion

        #region get
        /// <summary>
        /// GET: api/Departments
        /// returns list of each row in the table Department
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDTO>>> GetDepartment()
        {
            if (!_context.Departments.Any()) {
                return NotFound();
            }

            var departments = await _departmentService.GetDepartmentAsync();
            return Ok(departments);
        }
        #endregion

        #region put

        /// <summary>
        /// PUT: api/Departments/5
        /// used to add a new row into the Department table
        /// </summary>
        /// <param name="DepartmentID"></param>
        /// <param name="updatedDepartment">The new department row to be inserted</param>
        /// <returns></returns>
        [HttpPut("{DepartmentID}")]
        public async Task<DepartmentDTO> PutDepartment(Guid DepartmentID, DepartmentDTO updatedDepartment)
        {
            Department recordToUpdate = await (from department in _context.Departments
                                               where department.DepartmentId == updatedDepartment.DepartmentId
                                               select department).FirstAsync();

            recordToUpdate.DepartmentId = DepartmentID;
            recordToUpdate.DepartmentName = updatedDepartment.DepartmentName ?? recordToUpdate.DepartmentName;
            recordToUpdate.AbbrDepartmentName = updatedDepartment.AbbrDepartmentName ?? recordToUpdate.AbbrDepartmentName;
            recordToUpdate.CreatedBy = "Krutik Soni";
            recordToUpdate.CreatedDate = recordToUpdate.CreatedDate;
            recordToUpdate.ModifiedBy = "Krutik Soni";



            _context.UpdateRange(recordToUpdate);
            await _context.SaveChangesAsync();
            return updatedDepartment;

        }
        #endregion

        #region post
        /// <summary>
        /// POST: api/Departments
        /// used to update a row into the Department table
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(DepartmentDTO newDepartment)
        { 
            if (_context.Departments == null)
            {
                return Problem("Entity set " + nameof(IBSApplicationExerciseContext.Departments) + " is null.");
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
            _context.Departments.Add(addDepartment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartment), new { DepartmentID = newDepartment.DepartmentId }, newDepartment);
            
        }
        #endregion



        #region delete
        /// <summary>
        /// DELETE: api/Departments/5
        /// used to delete rows in the Department table by using the Department
        /// </summary>
        /// <param name="DepartmentID">id used to delete that department/row from the table</param>
        /// validates if person is assigned to a department and returns Conflic (code 409) to indicate removal was not possible
        /// <returns></returns>
        [HttpDelete("{DepartmentID}")]
        public async Task<IActionResult> DeleteDepartment(Guid DepartmentID)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = await _context.Departments.FindAsync(DepartmentID);
            if (department == null)
            {
                return NotFound();
            }

            var peopleExists = await _context.DepartmentAssignments.FirstOrDefaultAsync(e => e.DepartmentId == DepartmentID);

            if (peopleExists == null)
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return Conflict();
            }       
        }
        #endregion
    }
}
