import { useReducer, useState } from "react";
import { useNavigate } from "react-router";


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
    const [colour, setColour] = useState({ color: 'red' });
    let navigate = useNavigate();

    const submitData = (e) => {
        e.preventDefault();
        
        const reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: user.uid,
                pwd: user.pwd
            })
        };

        fetch("http://localhost:8080/login", reqOptions)
            .then(resp => resp.text())
            .then(data => setInfo(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setInfo("An error occurred while logging in.");
            });
    }

    return(
        <div>
            <form>
                <label>Enter Username</label>
                <input 
                    type="text" 
                    name="uid" 
                    value={user.uid}
                    onChange={(e) => dispatch({ type: 'update', fld: 'uid', val: e.target.value })} 
                />
                <br />
                <label>Enter Password</label>
                <input 
                    type="password" 
                    name="pwd" 
                    value={user.pwd}
                    onChange={(e) => dispatch({ type: 'update', fld: 'pwd', val: e.target.value })} 
                />
                <br />
                <input 
                    type="submit" 
                    value="Login" 
                    onClick={submitData} 
                />
                <input 
                    type="reset" 
                    value="Clear" 
                    onClick={() => dispatch({ type: "reset" })} 
                />
                <div 
                    style={colour} 
                    onMouseOver={() => setColour({ color: 'blue' })} 
                    onMouseLeave={() => setColour({ color: 'red' })}
                    onClick={() => navigate('/forgotpassword')}
                >
                    Forgot Password
                </div>
            </form>
            <p>{info}</p>
        </div>
    )
    
}
export default Login;