using EmployeeTable.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

/*
 * An intermediary layer between the controller and database, performing database CRUD operations.
 */
namespace EmployeeTable.Services
{
    public class EmployeesService
    {
        private readonly IMongoCollection<Employee> _employeesCollection;

        public EmployeesService(IOptions<CompanyDatabaseSettings> companyDatabaseSettings)
        {
            // Obtain database settings
            var mongoClient = new MongoClient(companyDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(companyDatabaseSettings.Value.DatabaseName);
            _employeesCollection = mongoDatabase.GetCollection<Employee>(companyDatabaseSettings.Value.CollectionName);
        }

        // Get all employees
        public async Task<List<Employee>> GetAsync() =>
            await _employeesCollection.Find(_ => true).ToListAsync();

        // Get one employee
        public async Task<Employee?> GetAsync(string id) =>
            await _employeesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Create a new employee
        public async Task CreateAsync(Employee newEmployee) =>
            await _employeesCollection.InsertOneAsync(newEmployee);

        // Update an employee's information
        public async Task UpdateAsync(string id, Employee updatedEmployee) =>
            await _employeesCollection.ReplaceOneAsync(x => x.Id == id, updatedEmployee);

        // Remove an employee
        public async Task RemoveAsync(string id) =>
            await _employeesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
