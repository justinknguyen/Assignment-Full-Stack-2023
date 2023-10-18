using EmployeeTable.Models;
using EmployeeTable.Services;
using Microsoft.AspNetCore.Mvc;

/*
 * Defines routes and handles incoming HTTP requests to perform CRUD operations using the Service class, EmployeesService.
 */
namespace EmployeeTable.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesService _employeesService;

        public EmployeesController(EmployeesService employeesService)
        {
            _employeesService = employeesService;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<List<Employee>> Get()
        {
            return await _employeesService.GetAsync();
        }

        // GET: api/employees/{id}
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Employee>> Get(string id)
        {
            var employee = await _employeesService.GetAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }

        // POST: api/employees
        [HttpPost]
        public async Task<IActionResult> Post(Employee newEmployee)
        {
            await _employeesService.CreateAsync(newEmployee);
            return CreatedAtAction(nameof(Get), new { id = newEmployee.Id }, newEmployee);
        }

        // PUT: api/employees/{id}
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Employee updatedEmployee)
        {
            var employee = await _employeesService.GetAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            updatedEmployee.Id = employee.Id;
            await _employeesService.UpdateAsync(id, updatedEmployee);
            return NoContent();
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var employee = await _employeesService.GetAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            await _employeesService.RemoveAsync(id);
            return NoContent();
        }
    }
}
