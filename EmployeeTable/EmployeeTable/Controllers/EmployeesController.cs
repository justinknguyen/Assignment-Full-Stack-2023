using EmployeeTable.Models;
using EmployeeTable.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<List<Employee>> Get()
        {
            return await _employeesService.GetAsync();
        }
            
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

        [HttpPost]
        public async Task<IActionResult> Post(Employee newEmployee)
        {
            await _employeesService.CreateAsync(newEmployee);
            return CreatedAtAction(nameof(Get), new { id = newEmployee.Id }, newEmployee);
        }

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
