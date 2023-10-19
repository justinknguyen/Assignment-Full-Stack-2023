import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Get and list all employees in the database.
 */
const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);

    function handleEdit(employee) {
        console.log(employee);
    }

    // Remove the employee based on Id
    function handleDelete(employee) {
        fetch(`api/employees/${employee.id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    // Employee removed
                    console.log('Removed the employee successfully!');
                    setEmployees(employees.filter(emp => emp.id !== employee.id));
                } else {
                    // Employee could not be removed
                    console.error('Error removing the employee.');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='table-header'>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                key={employee.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{employee.firstName}</TableCell>
                                <TableCell align="right">{employee.lastName}</TableCell>
                                <TableCell align="right"> ${employee.salary.toLocaleString()}</TableCell>
                                <TableCell align="right">
                                    <Button variant="text" onClick={() => handleEdit(employee)}>Edit</Button>
                                    <Button variant="text" onClick={() => handleDelete(employee)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default GetEmployees;