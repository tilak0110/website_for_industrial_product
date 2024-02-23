import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [disableEmailInput, setDisableEmailInput] = useState(false);
    const [disableResend, setDisableResend] = useState(false);
    const [timer, setTimer] = useState(60);
    const [serverOtp, setServerOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (disableResend) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [disableResend]);

    useEffect(() => {
        if (timer === 0) {
            setDisableResend(false);
            setTimer(60);
        }
    }, [timer]);

    const handleUsernameChange = (event) => {
        const email = event.target.value;
        setUsername(email);
        // Save email in local storage
        localStorage.setItem('email', email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call your backend API to generate OTP
        fetch('http://localhost:8080/generateotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Username not found in the database');
            }
            setShowOtpInput(true); // Show the OTP input box
            setDisableEmailInput(true); // Disable the email input box
            setDisableResend(true); // Disable the resend button
            return response.text();
        })
        .then(data => {
            setServerOtp(data); // Store the received OTP
            setMessage('OTP has been sent to you via Email');
        })
        .catch(error => {
            setMessage(error.message);
        });
    }

    const handleOtpSubmit = (event) => {
        event.preventDefault();
        // Verify the OTP entered by the user with the OTP received from the server
        if (otp === serverOtp) {
            setMessage('OTP matched successfully');
            navigate("/changepassword");
        } else {
            setMessage('Entered wrong OTP');
        }
    }

    const handleResendClick = () => {
        setDisableResend(true); // Disable the resend button
        setTimer(60); // Reset the timer
        // Call your backend API to resend OTP
        fetch('http://localhost:8080/generateotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Username not found in the database');
            }
            return response.text();
        })
        .then(data => {
            setServerOtp(data); // Store the received OTP
            setMessage('OTP has been resent to you via Email');
        })
        .catch(error => {
            setMessage(error.message);
        });
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Forgot Password</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} disabled={disableEmailInput} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3" disabled={disableResend}>{showOtpInput ? 'Resend OTP' : 'Generate OTP'}</button>
                    </form>
                    {disableResend && <p className="mb-3">Resend OTP in {timer} seconds</p>}
                    {message && <p className="mb-3">{message}</p>}
                    {showOtpInput && (
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP:</label>
                                <input type="text" id="otp" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit OTP</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
