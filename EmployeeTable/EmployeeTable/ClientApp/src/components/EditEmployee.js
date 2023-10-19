import { useState } from 'react';
import Button from '@mui/material/Button';

/**
 * Edit an employee's information in the database.
 */
const EditEmployee = ({ employee,
    employees, setEmployees,
    editEmployee, setEditEmployee,
    updatedData, setUpdatedData }) => {

    // On Edit button press, initialize employee to edit info 
    function handleEdit() {
        setEditEmployee(employee);
        setUpdatedData({
            ...employee
        });
    }

    // Update the employee's information based on the text fields
    function handleSave() {
        if (updatedData.firstName === '' || updatedData.lastName === '') {
            console.error('Please input a name.');
            return;
        }
        if (updatedData.salary === '') {
            updatedData.salary = 0;
        }

        fetch(`api/employees/${editEmployee.id}`, {
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
                        if (emp.id === editEmployee.id) {
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

    return (
        <>
            {editEmployee ? (
                <Button
                    variant='contained'
                    type='submit'
                    color='success'
                    size='small'
                    sx={{ marginRight: 1 }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            ) : (
                <Button
                    variant='contained'
                    size='small'
                    sx={{ marginRight: 1 }}
                    onClick={handleEdit}
                >
                    Edit
                </Button >
            )}

        </>
    );
}

export default EditEmployee;