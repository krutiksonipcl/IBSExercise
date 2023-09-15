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
        private readonly IBSApplicationExerciseContext _context;

        public PeopleController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<People>>> GetPeople()
        {
          if (_context.People == null)
          {
              return NotFound();
          }
            return await _context.People.ToListAsync();
        }
        
        // GET: api/People/5
        [HttpGet("{PeopleID}")]
        public async Task<ActionResult<People>> GetPeople(Guid id)
        {
          if (_context.People == null)
          {
              return NotFound();
          }
            var people = await _context.People.FindAsync(id);

            if (people == null)
            {
                return NotFound();
            }

            return people;
        }

        // PUT: api/People/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{PeopleID}")]
        public async Task<IActionResult> PutPeople(Guid id, People people)
        {
            if (id != people.PeopleId)
            {
                return BadRequest();
            }

            _context.Entry(people).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeopleExists(id))
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

        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<People>> PostPeople(People people)
        {
          if (_context.People == null)
          {
              return Problem("Entity set 'IBSApplicationExerciseContext.People'  is null.");
          }
            _context.People.Add(people);
            await _context.SaveChangesAsync();

            // return 201 status if successful and creates a new resource in the server
            // adds location header to specify the URI of the new item
            // references GetPeople 
            return CreatedAtAction(nameof(GetPeople), new { id = people.PeopleId }, people);
        }

        // DELETE: api/People/5
        [HttpDelete("{PeopleID}")]
        public async Task<IActionResult> DeletePeople(Guid id)
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            var people = await _context.People.FindAsync(id);
            if (people == null)
            {
                return NotFound();
            }

            _context.People.Remove(people);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PeopleExists(Guid id)
        {
            return (_context.People?.Any(e => e.PeopleId == id)).GetValueOrDefault();
        }
    }
}
