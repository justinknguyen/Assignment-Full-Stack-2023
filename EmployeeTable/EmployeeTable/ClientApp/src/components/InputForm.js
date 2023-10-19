import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';

const InputForm = ({ employee, handleInputChange }) => {
    return (
        <>
            <TableCell component='th' scope='row'>
                <TextField
                    required
                    label='First Name'
                    name='firstName'
                    autoComplete='off'
                    size='small'
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
                    onChange={handleInputChange}
                    defaultValue={employee.salary}
                />
            </TableCell>
        </>
    );
}

export default InputForm;