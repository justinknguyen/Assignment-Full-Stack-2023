import { useState } from 'react';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import InputForm from './InputForm';

/**
 * Add an employee to the database.
 */
const AddEmployee = ({ updateEmployeeList }) => {
    const [addPressed, setAddPressed] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        title: '',
        firstName: '',
        lastName: '',
        salary: ''
    });

    // Add the new employee from the form's data
    function handleSubmit() {
        if (newEmployee.title === '') {
            console.error('Please input a title.');
            return;
        }
        if (newEmployee.firstName === '' || newEmployee.lastName === '') {
            console.error('Please input a name.');
            return;
        }
        if (newEmployee.salary === '') {
            newEmployee.salary = 0;
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
                    setAddPressed(false)
                    updateEmployeeList();
                    setNewEmployee({
                        title: '',
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
            <TableFooter>
                <TableRow >
                    {addPressed ? (
                        <>
                            <InputForm
                                employee={newEmployee}
                                form={newEmployee}
                                setForm={setNewEmployee}
                            />
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    type='submit'
                                    size='small'
                                    sx={{ marginRight: 1 }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='error'
                                    size='small'
                                    onClick={() => setAddPressed(false)}
                                >
                                    Cancel
                                </Button>
                            </TableCell >
                        </>
                    ) : (
                        <>
                            <TableCell component='th' scope='row'></TableCell>
                            <TableCell align='left'></TableCell>
                            <TableCell align='left'></TableCell>
                            <TableCell align='left'></TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='text'
                                    type='submit'
                                    color='secondary'
                                    onClick={() => setAddPressed(true)}
                                >
                                    Add Employee
                                </Button>
                            </TableCell >
                        </>
                    )}
                </TableRow >
            </TableFooter >
        </>
    );
}

export default AddEmployee;