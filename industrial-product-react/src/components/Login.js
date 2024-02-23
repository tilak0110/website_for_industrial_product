import React, { useState } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "./loggedSlice";

const initialState = {
    uid: "",
    pwd: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, [action.fld]: action.val };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

function Login() {
    const [user, dispatch] = useReducer(reducer, initialState);
    const [info, setInfo] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    let navigate = useNavigate();
    const reduxAction = useDispatch();

    const submitData = (e) => {
        e.preventDefault();
    
        // Check if username or password is empty
        if (!user.uid || !user.pwd) {
            setInfo("Please enter both username and password.");
            return;
        }
    
        const url = 'http://localhost:8080/login';
        const requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.uid,
                password: user.pwd
            })
        };
    
        fetch(url, requestBody)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Invalid username or password.'); // Throw error for non-2xx responses
                }
                return resp.json(); // Parse response as JSON for successful responses
            })
            .then(data => {
                setInfo(data);
                localStorage.setItem("loggedUser",JSON.stringify(data));
                localStorage.setItem("user", JSON.stringify(data));
                reduxAction(login());
                if (data.role_id === 2) {
                    navigate('/SellerLand');
                } else if (data.role_id === 3) {
                    navigate('/CustLand');
                } else if (data.role_id === 1) {
                    navigate('/admin');
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setInfo(error.message || "An error occurred while logging in."); // Set error message to the error thrown or default message
            });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4"> {/* Wrapper div with card styling */}
                        <h1 className="text-center mb-4">
                        Login Here<span role="img" aria-label="key" style={{ fontSize: "1em" }}>🔑</span>
                        </h1>
                        <form onSubmit={submitData}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Enter Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={user.uid}
                                    onChange={(e) => dispatch({ type: 'update', fld: 'uid', val: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Enter Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"} // Show password if showPassword is true
                                        className="form-control"
                                        id="password"
                                        value={user.pwd}
                                        onChange={(e) => dispatch({ type: 'update', fld: 'pwd', val: e.target.value })}
                                    />
                                    <button
                                        className="btn btn-outline-secondary" 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                    >
                                        {showPassword ? "🔓" : "🔒"} {/* Lock and unlock emojis based on showPassword state */}
                                    </button>
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button type="reset" className="btn btn-secondary">Clear</button>
                            </div>
                        </form>
                        <p className="text-danger mt-3">{info}</p>
                        <div 
                            className="text-center mt-3 text-decoration-underline text-primary" 
                            onClick={() => navigate('/forgotpassword')}
                        >
                            Forgot Password
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
