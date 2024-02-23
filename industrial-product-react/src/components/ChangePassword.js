import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(e.target.value);
        if (!isValid && e.target.value !== '') {
            setErrorMessage("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character");
        } else {
            setErrorMessage('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Retrieve email from local storage
        const username = localStorage.getItem('email');

        // Make POST request to change password
        fetch('http://localhost:8080/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Include username and password in the request body
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(() => {
            setErrorMessage('');
            setPassword('');
            setConfirmPassword('');
            alert('Password changed successfully!');
            navigate("/login");
            
        })
        .catch(error => {
            setErrorMessage(error.message || 'An error occurred while changing password.');
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h1 className="text-center mb-4">Change Password</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">New Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Change Password</button>
                            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
