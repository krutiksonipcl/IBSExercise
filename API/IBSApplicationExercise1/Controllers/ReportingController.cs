using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBSApplicationExercise1._generated;
using IBSApplicationExercise1.Models;
using IBSApplicationExercise1.Services;

namespace IBSApplicationExercise1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportingController : Controller
    {
        private readonly IBSApplicationExerciseContext _context;

        public ReportingController(IBSApplicationExerciseContext context)
        {
            _context = context;
        }
        #region get
        /// <summary>
        /// Get: api/Reporting
        /// Get method for the reporting module
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetReporting()
        {
            try
            {
                var data = _context.ReportingViews.ToList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }
        #endregion
    }
}
