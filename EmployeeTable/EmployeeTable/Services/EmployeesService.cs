using EmployeeTable.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EmployeeTable.Services
{
    public class EmployeesService
    {
        private readonly IMongoCollection<Employee> _employeesCollection;

        public EmployeesService(IOptions<CompanyDatabaseSettings> companyDatabaseSettings)
        {
            var mongoClient = new MongoClient(companyDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(companyDatabaseSettings.Value.DatabaseName);
            _employeesCollection = mongoDatabase.GetCollection<Employee>(companyDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<Employee>> GetAsync() =>
            await _employeesCollection.Find(_ => true).ToListAsync();

        public async Task<Employee?> GetAsync(string id) =>
            await _employeesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Employee newEmployee) =>
            await _employeesCollection.InsertOneAsync(newEmployee);

        public async Task UpdateAsync(string id, Employee updatedEmployee) =>
            await _employeesCollection.ReplaceOneAsync(x => x.Id == id, updatedEmployee);

        public async Task RemoveAsync(string id) =>
            await _employeesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
