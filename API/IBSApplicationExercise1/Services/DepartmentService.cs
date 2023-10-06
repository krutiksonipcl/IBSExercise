using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IBSApplicationExercise1.Models;
using IBSApplicationExercise1._generated;
using NuGet.Protocol;

namespace IBSApplicationExercise1.Services
{
    public class DepartmentService
    {
        private readonly IBSApplicationExerciseContext _context;

        public DepartmentService(IBSApplicationExerciseContext context)
        {
            _context = context;
        }

        public async Task<List<DepartmentDTO>> GetDepartmentAsync()
        {
            return await _context.Departments.Select(x => new DepartmentDTO
            {
                DepartmentId = x.DepartmentId,
                DepartmentName = x.DepartmentName,
                AbbrDepartmentName = x.AbbrDepartmentName
            }).ToListAsync();
        }
    }
    
}