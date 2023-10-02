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
    public class PeopleController : ControllerBase
    {
        #region init
        private readonly IBSApplicationExerciseContext _context;

        public PeopleController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }
        #endregion

        #region get
        // GET: api/People
        /// <summary>
        /// returns list of each row in the table People
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PeopleDTO>>> GetPeople([FromQuery] bool ActiveOnly)
        {

            if (!_context.People.Any())
            {
                return NotFound();
            }
            
            if (ActiveOnly)
            {
                var activePeople = await _context.People
                       .Where(da => da.Active == true)
                       .ToListAsync();

                return Ok(activePeople);

            }
            else
            {
                return await _context.People.Select(x => new PeopleDTO
                {
                    PersonId = x.PersonId,
                    Email = x.Email,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    PhoneNumber = x.PhoneNumber,
                    Active = x.Active,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                }).ToListAsync();
            }
            
            //return await _context.People.ToListAsync();
        }
        #endregion

        #region put
        // PUT: api/People/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to update entries in the People table using the PeopleID
        /// </summary>
        /// <param name="PeopleID">id used to reference rows in the People table</param>
        /// <param name="people">model representing the People table</param>
        /// <returns></returns>
        [HttpPut("{PeopleID}")]
        public async Task<IActionResult> PutPeople(Guid PersonId, Person people)
        {
            if (PersonId != people.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(people).State = EntityState.Modified;
            await _context.SaveChangesAsync();
           
            return NoContent();
        }
        #endregion

        #region post
        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// used to add a new row into the People table
        /// </summary>
        /// <param name="people"> the data from the front end to be set into the DepartmentAssignment table</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Person>> PostPeople(Person newPerson)
        {
            if (_context.People == null)
            {
                return Problem("Entity set " + nameof(IBSApplicationExerciseContext.People) + " is null.");
            }

            var addPerson = new Person()
            {   
                Active = newPerson.Active, 
                FirstName = newPerson.FirstName,
                LastName = newPerson.LastName,
                Email = newPerson.Email,
                PhoneNumber = newPerson.PhoneNumber,
                StartDate = newPerson.StartDate,
                EndDate = newPerson.EndDate,
                CreatedBy = "Krutik Soni",
                ModifiedBy = "Krutik Soni"
            };
            _context.People.Add(addPerson);
            await _context.SaveChangesAsync();

            // return 201 status if successful and creates a new resource in the server
            // adds location header to specify the URI of the new item
            // references GetPeople 
            return CreatedAtAction(nameof(GetPeople), new { PeopleID = newPerson.PersonId }, newPerson);
        }
        #endregion

        #region delete
        // DELETE: api/People/5
        /// <summary>
        /// used to delete rows in the people table by using the peopleID
        /// </summary>
        /// <param name="PeopleID">id used to delete that person/row from the table</param>
        /// <returns></returns>
        [HttpDelete("{PeopleID}")]
        public async Task<IActionResult> DeletePeople(Guid PeopleID)
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            var people = await _context.People.FindAsync(PeopleID);
            if (people == null)
            {
                return NotFound();
            }

            _context.People.Remove(people);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion
    }
}
