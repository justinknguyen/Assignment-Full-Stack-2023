using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

/*
 * Defines the data model (structure and properties) for employees.
 */
namespace EmployeeTable.Models
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; } = null!;

        [BsonElement("lastName")]
        public string LastName { get; set;} = null!;

        [BsonElement("salary")]
        public int Salary { get; set; }
    }
}
