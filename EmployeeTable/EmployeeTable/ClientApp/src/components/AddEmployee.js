import { useState } from 'react';

/**
 * Add an employeee to the database.
 */
const AddEmployee = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        salary: ''
    });

    // Post the form's data to the API
    async function handleSubmit(event) {
        event.preventDefault();
        await fetch('api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    // Employee added, reset the form
                    console.log('Added the employee successfully!');
                    setFormData({
                        firstName: '',
                        lastName: '',
                        salary: ''
                    });
                    setSuccess(true);
                } else {
                    // Employee could not be added
                    console.error('Error adding the employee.');
                    setSuccess(false);
                }
            })
            .catch(err => {
                // Network response error
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
            <h1>Add an Employee</h1>
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
                        />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </form>
            </div>

            {/* Show result */}
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

export default AddEmployee;