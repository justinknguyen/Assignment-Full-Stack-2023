import { useState, useEffect } from 'react';

/**
 * Get and list all employees in the database.
 */
const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch all employees on page load
    useEffect(() => {
        fetch('api/employees')
            .then(res => res.json())
            .then(res => setEmployees(res))
            .catch(err => console.error(err))
    }, []);

    return (
        <>
            <h1>Employees</h1>
            <ul>
                {/* List the fetched employees */}
                {employees.map(emp => (
                    <li key={emp.id}>
                        <p><strong>Id:</strong> {emp.id}</p>
                        <p><strong>First Name:</strong> {emp.firstName}</p>
                        <p><strong>Last Name:</strong> {emp.lastName}</p>
                        <p><strong>Salary:</strong> {emp.salary}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default GetEmployees;