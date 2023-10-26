import Button from '@mui/material/Button';

/**
 * Remove an employee from the database.
 */
const RemoveEmployee = ({ employee,
    removeEmployee, setRemoveEmployee,
    editEmployee, updateEmployeeList }) => {

    // Remove the employee based on Id
    function handleDelete() {
        fetch(`api/employees/${employee.id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    // Employee removed
                    console.log('Removed the employee successfully!');
                    updateEmployeeList();
                } else {
                    // Employee could not be removed
                    console.error('Error removing the employee.');
                }
            })
            .catch(err => console.error(err));
    }

    function editCheck() {
        if (editEmployee && editEmployee === employee) {
            return null;
        }

        return (
            <Button
                variant='contained'
                color='error'
                size='small'
                onClick={() => setRemoveEmployee(employee)}
            >
                Delete
            </Button>
        );
    }

    return (
        <>
            {removeEmployee === employee ? (
                <>
                    <Button
                        variant='contained'
                        type='submit'
                        color='success'
                        size='small'
                        sx={{ marginRight: 1 }}
                        onClick={handleDelete}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        onClick={() => setRemoveEmployee(null)}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                editCheck()
            )}
        </>
    );
}

export default RemoveEmployee;