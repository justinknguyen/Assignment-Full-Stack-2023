import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const InputForm = ({ employee, form, setForm }) => {
    const [isTitleError, setIsTitleError] = useState(false);
    const [isFirstError, setIsFirstError] = useState(false);
    const [isLastError, setIsLastError] = useState(false);
    const [isSalaryError, setIsSalaryError] = useState(false);

    // Tracks changes in the text fields
    function handleInputChange(event) {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });

        if (name === 'title') {
            setIsTitleError(value === '');
        }
        if (name === 'firstName') {
            setIsFirstError(value === '');
        }
        if (name === 'lastName') {
            setIsLastError(value === '');
        }
        if (name === 'salary') {
            setIsSalaryError(isNaN(Number(value)));
        }
    };

    return (
        <>
            <TableCell component='th' scope='row'>
                <TextField
                    required
                    label='Title'
                    name='title'
                    autoComplete='off'
                    size='small'
                    error={isTitleError}
                    onChange={handleInputChange}
                    defaultValue={employee.title}
                />
            </TableCell>
            <TableCell align='left'>
                <TextField
                    required
                    label='First Name'
                    name='firstName'
                    autoComplete='off'
                    size='small'
                    error={isFirstError}
                    onChange={handleInputChange}
                    defaultValue={employee.firstName}
                />
            </TableCell>
            <TableCell align='left'>
                <TextField
                    required
                    label='Last Name'
                    name='lastName'
                    autoComplete='off'
                    size='small'
                    error={isLastError}
                    onChange={handleInputChange}
                    defaultValue={employee.lastName}
                />
            </TableCell>
            <TableCell align='left'>
                <TextField
                    label='Salary'
                    name='salary'
                    autoComplete='off'
                    size='small'
                    error={isSalaryError}
                    onChange={handleInputChange}
                    defaultValue={employee.salary}
                />
            </TableCell>
        </>
    );
}

export default InputForm;