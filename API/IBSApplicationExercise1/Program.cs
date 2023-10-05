using IBSApplicationExercise1.Controllers;
using IBSApplicationExercise1.Models;
using IBSApplicationExercise1.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddTransient<DepartmentService>();
builder.Services.AddControllers();
builder.Services.AddDbContext<IBSApplicationExerciseContext>(options =>
{ // this is dependency injection of the database context into the program so that the conrollers can use it
    options.UseSqlServer("Data Source = 29J46158\\SQLEXPRESS03; Initial Catalog = IBSApplicationExercise; Integrated Security = True; TrustServerCertificate= True");
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();