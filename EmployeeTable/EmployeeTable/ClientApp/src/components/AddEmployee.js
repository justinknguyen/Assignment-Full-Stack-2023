import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/**
 * Add an employee to the database.
 */
const AddEmployee = ({ setEmployees }) => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        salary: ''
    });

    // Update the employee list in parent to re-render table
    function updateEmployeeList() {
        fetch('api/employees')
            .then(res => res.json())
            .then(res => setEmployees(res))
            .catch(err => console.error(err));
    }

    // Handles changes in the input fields
    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    // Add the new employee from the form's data
    function handleSubmit(event) {
        event.preventDefault();
        if (newEmployee.firstName === '' ||
            newEmployee.lastName === '' ||
            newEmployee.salary === '') {
            console.error('Please input all fields.');
            return;
        }

        fetch('api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
            .then(res => {
                if (res.ok) {
                    // Employee added, reset the form
                    console.log('Added the employee successfully!');
                    updateEmployeeList();
                    setNewEmployee({
                        firstName: '',
                        lastName: '',
                        salary: ''
                    });
                } else {
                    // Employee could not be added
                    console.error('Error adding the employee.');
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <h1>Add an Employee</h1>
            <form noValidate onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row">
                    <TextField
                        required
                        label='First Name'
                        name='firstName'
                        onChange={handleInputChange}
                        value={newEmployee.firstName}
                    />
                    <TextField
                        required
                        label='Last Name'
                        name='lastName'
                        onChange={handleInputChange}
                        value={newEmployee.lastName}
                    />
                    <TextField
                        required
                        label='Salary'
                        name='salary'
                        onChange={handleInputChange}
                        value={newEmployee.salary}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default AddEmployee;