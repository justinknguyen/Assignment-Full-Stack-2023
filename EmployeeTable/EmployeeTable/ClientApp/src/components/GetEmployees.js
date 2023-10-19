import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddEmployee from './AddEmployee';

/**
 * Table of all employees, including operations to add, delete, and edit employees.
 */
const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [editEmployee, setEditEmployee] = useState();
    const [updatedData, setUpdatedData] = useState({
        firstName: '',
        lastName: '',
        salary: ''
    });

    // Handles changes in the input fields
    function handleInputChange(event) {
        const { name, value } = event.target;
        setUpdatedData({
            ...editEmployee,
            [name]: value
        });
    };

    // Update the employee's information based on the input fields
    function handleSave(employee) {
        if (employee.firstName === '' ||
            employee.lastName === '' ||
            employee.salary === '') {
            console.error('Please input all fields.');
            return;
        }

        fetch(`api/employees/${employee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => {
                if (res.ok) {
                    // Employee information updated
                    console.log('Updated the employee successfully!');
                    setEmployees(employees.map(emp => {
                        if (emp.id === employee.id) {
                            return { ...emp, ...updatedData };
                        }
                        return emp;
                    }));
                    setEditEmployee(null)
                } else {
                    // Employee information could not be updated
                    console.error('Error editing the employee.');
                }
            })
            .catch(err => console.error(err));
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
            .catch(err => console.error(err));
    }

    // Fetch all employees on page load
    useEffect(() => {
        fetch('api/employees')
            .then(res => res.json())
            .then(res => setEmployees(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h1>Employees</h1>
            <TableContainer component={Paper} sx={{ width: '75%' }}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow className='table-header'>
                            <TableCell className='header-text'>First Name</TableCell>
                            <TableCell align='left' className='header-text'>Last Name</TableCell>
                            <TableCell align='left' className='header-text'>Salary</TableCell>
                            <TableCell align='right' className='header-text'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(emp => (
                            <TableRow
                                key={emp.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {editEmployee === emp ? (
                                    <>
                                        <TableCell component='th' scope='row'>
                                            <TextField
                                                required
                                                label='First Name'
                                                name='firstName'
                                                autoComplete='off'
                                                onChange={handleInputChange}
                                                defaultValue={emp.firstName}
                                            />
                                        </TableCell>
                                        <TableCell align='left'>
                                            <TextField
                                                required
                                                label='Last Name'
                                                name='lastName'
                                                autoComplete='off'
                                                onChange={handleInputChange}
                                                defaultValue={emp.lastName}
                                            />
                                        </TableCell>
                                        <TableCell align='left'>
                                            <TextField
                                                required
                                                label='Salary'
                                                name='salary'
                                                autoComplete='off'
                                                onChange={handleInputChange}
                                                defaultValue={emp.salary}
                                            />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant='contained'
                                                type='submit'
                                                color='success'
                                                onClick={() => handleSave(emp)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={() => setEditEmployee(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell component='th' scope='row'>
                                            {emp.firstName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {emp.lastName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            ${emp.salary.toLocaleString()}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant='contained'
                                                onClick={() => setEditEmployee(emp)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => handleDelete(emp)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br>

            <AddEmployee setEmployees={setEmployees} />
        </>
    );
}

export default GetEmployees;