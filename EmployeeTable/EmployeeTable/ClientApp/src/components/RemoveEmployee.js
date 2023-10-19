import Button from '@mui/material/Button';

/**
 * Remove an employee from the database.
 */
const RemoveEmployee = ({ employee,
    employees, setEmployees,
    editEmployee, setEditEmployee}) => {

    // Remove the employee based on Id
    function handleDelete() {
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

    return (
        <>
            {editEmployee ? (
                <Button
                    variant='outlined'
                    color='error'
                    size='small'
                    onClick={() => setEditEmployee(null)}
                >
                    Cancel
                </Button>
            ) : (
                <Button
                    variant='contained'
                    color='error'
                    size='small'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            )}
        </>
    );
}

export default RemoveEmployee;