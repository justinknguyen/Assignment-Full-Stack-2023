import { useState } from 'react';

/**
 * Remove an employee from the database.
 */
const RemoveEmployee = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    // Remove the employee based on Id
    async function handleSubmit(event) {
        event.preventDefault();
        const id = event.target.id.value;

        await fetch(`api/employees/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    // Employee removed
                    console.log('Removed the employee successfully!');
                    setSuccess(true);
                    event.target.id.value = '';
                } else {
                    // Employee could not be removed
                    console.error('Error removing the employee.');
                    setSuccess(false);
                }
            })
            .catch(err => {
                console.error(err);
                setSuccess(false);
            });

        setIsSubmitted(true);
    }

    return (
        <>
            <h1>Remove an Employee</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit}>
                    <label className='form-group'>
                        Enter Id: <input type="text" name="id" className="form-control" required />
                    </label>
                    <button type="submit" className="btn btn-primary">Remove</button>
                </form>
            </div>

            {isSubmitted ? (
                success ? (
                    <h2>Removed!</h2>
                ) : (
                    <h2>Failed.</h2>
                )
            ) : (
                null
            )}
        </>
    );
}

export default RemoveEmployee;