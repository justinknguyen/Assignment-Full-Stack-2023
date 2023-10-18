import { useState } from 'react';

/**
 * Edit an employee's information in the database.
 */
const EditEmployee = () => {
    const [isSearched, setIsSearched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState();
    const [employee, setEmployee] = useState();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        salary: ''
    });

    // Search for the employee based on Id
    async function handleSearch(event) {
        event.preventDefault();
        const id = event.target.id.value;

        await fetch(`api/employees/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error('Error Code: ' + res.status);
                }
            })
            .then(res => {
                setEmployee(res);
                setFormData({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    salary: res.salary
                });
                setId(id);
            })
            .catch(e => console.error('Error: ' + e))

        setIsSearched(true);
    }

    // Update the employee's information based on the form's data
    async function handleSubmit(event) {
        event.preventDefault();

        await fetch(`api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    // Employee information updated
                    console.log('Updated the employee successfully!');
                    setSuccess(true);
                } else {
                    // Employee information could not be updated
                    console.error('Error editing the employee.');
                    setSuccess(false);
                }
            })
            .catch(err => {
                console.error(err);
                setSuccess(false);
            });

        setIsSubmitted(true);
    }

    // Handles changes in the form's input fields
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <h1>Edit an Employee</h1>
            <div className="form-control">
                <form onSubmit={handleSearch}>
                    <label className='form-group'>
                        Enter Id: <input type="text" name="id" className="form-control" required />
                    </label>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>

            {isSearched ? (
                employee ? (
                    <div className="form-control">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Enter First Name: <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Enter Last Name: <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Enter Salary: <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                        </form>
                    </div>
                ) : (
                    <h2>Sorry, could not find the employee.</h2>
                )
            ) : (
                null
            )}

            {isSubmitted ? (
                success ? (
                    <h2>Success!</h2>
                ) : (
                    <h2>Failed.</h2>
                )
            ) : (
                null
            )}
        </>
    );
}

export default EditEmployee;