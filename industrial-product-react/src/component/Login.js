import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useDispatch } from "react-redux";

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
    
    const [user, run] = useReducer(reducer, initialState);
    const [info, setInfo] = useState("");
    const [colour, setColour] = useState({ color: 'red' });
    let navigate = useNavigate();
    const dispatch=useDispatch();

    

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
        dispatch(
           {
            uid : user.uid,
            loggedIn : true,
           }
        )

        fetch("http://localhost:8080/login", reqOptions)
            .then(resp => resp.text())
            .then(data => setInfo(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setInfo("An error occurred while logging in.");
            });
    }

    return(
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Enter Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        name="uid" 
                        value={user.uid}
                        onChange={(e) => run({ type: 'update', fld: 'uid', val: e.target.value })} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="pwd" 
                        value={user.pwd}
                        onChange={(e) => run({ type: 'update', fld: 'pwd', val: e.target.value })} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={(e)=> submitData(e)}
                >
                    Login
                </button>
                <button 
                    type="reset" 
                    className="btn btn-secondary" 
                    onClick={() => run({ type: "reset" })}
                >
                    Clear
                </button>
                <div 
                    style={colour} 
                    onMouseOver={() => setColour({ color: 'blue' })} 
                    onMouseLeave={() => setColour({ color: 'red' })}
                    onClick={() => navigate('')}
                    className="mt-2"
                >
                    <button type="button" className="btn btn-link">Forgot Password</button>
                </div>
            </form>
            <p>{info}</p>
        </div>
    )
}
export default Login;
