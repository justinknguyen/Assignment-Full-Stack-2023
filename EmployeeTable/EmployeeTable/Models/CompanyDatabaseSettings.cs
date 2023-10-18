namespace EmployeeTable.Models
{
    public class CompanyDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set;} = null!;

        public string CollectionName { get; set; } = null!;
    }
}
