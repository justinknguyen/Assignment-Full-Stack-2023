import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddEmployee from './AddEmployee';
import InputForm from './InputForm';
import EditEmployee from './EditEmployee';
import RemoveEmployee from './RemoveEmployee';

/**
 * Table of all employees, including operations to add, delete, and edit employees.
 */
const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [removeEmployee, setRemoveEmployee] = useState(null);
    const [editEmployee, setEditEmployee] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        salary: ''
    });

    const childProps = {
        employees, setEmployees,
        removeEmployee, setRemoveEmployee,
        editEmployee, setEditEmployee,
        updatedData, setUpdatedData
    }

    // Update the employee list in parent to re-render table
    function updateEmployeeList() {
        fetch('api/employees')
            .then(res => res.json())
            .then(res => setEmployees(res))
            .catch(err => console.error(err));
    }

    // Fetch all employees on page load
    useEffect(() => {
        updateEmployeeList();
    }, []);

    return (
        <>
            <h2>Employees</h2>
            <TableContainer component={Paper}>
                <Table size='medium'>

                    <TableHead>
                        <TableRow className='table-header'>
                            <TableCell className='header-text'>Title</TableCell>
                            <TableCell align='left' className='header-text'>First Name</TableCell>
                            <TableCell align='left' className='header-text'>Last Name</TableCell>
                            <TableCell align='left' className='header-text'>Salary</TableCell>
                            <TableCell align='right' className='header-text'>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.map(emp => (
                            <TableRow key={emp.id}>
                                {editEmployee === emp ? (
                                    <InputForm
                                        employee={editEmployee}
                                        form={updatedData}
                                        setForm={setUpdatedData}
                                    />
                                ) : (
                                    <>
                                        <TableCell component='th' scope='row'>
                                            {emp.title}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {emp.firstName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {emp.lastName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            ${emp.salary.toLocaleString()}
                                        </TableCell>
                                    </>
                                )}

                                <TableCell align='right'>
                                    <EditEmployee
                                        {...childProps}
                                        employee={emp}
                                    />
                                    <RemoveEmployee
                                        {...childProps}
                                        employee={emp}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <AddEmployee
                        updateEmployeeList={updateEmployeeList}
                    />
                </Table>
            </TableContainer>
        </>
    );
}

export default GetEmployees;