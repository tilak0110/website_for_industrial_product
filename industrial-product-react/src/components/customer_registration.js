import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const init = {
  fname: { value: "", valid: false, touched: false, error: "" },
  lname: { value: "", valid: false, touched: false, error: "" },
  pwd: { value: "", valid: false, touched: false, error: "" },
  rpwd: { value: "", valid: false, touched: false, error: "" },
  mail: { value: "", valid: false, touched: false, error: "" },
  add: { value: "", touched: false, error: "" },
  phone: { value: "", valid: false, touched: false, error: "" },
  city: { value: "", touched: false, error: "" },
  state: { value: "", touched: false, error: "" }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'insert':
      const { key, value, touched, valid, error } = action.data;
      return { ...state, [key]: { value, touched, valid, error } };
    case 'reset':
      return init;
    default:
      return state;
  }
};

export default function Register() {
  const [customer, dispatch] = useReducer(reducer, init);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const validateData = (key, val) => {
    let valid = true;
    let error = "";
    switch (key) {
      case 'fname':
      case 'lname':
        {
          let pattern = /^[A-Za-z ]+$/;
          if (!pattern.test(val)) {
            valid = false;
            error = "Name should contain only alphabets";
          }
          break;
        }
      case 'pwd':
        {
          let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
          if (!pattern.test(val)) {
            valid = false;
            error = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character";
          }
          break;
        }
      case 'rpwd':
        {
          if (val !== customer.pwd.value) {
            valid = false;
            error = "Passwords do not match";
          }
          break;
        }
      case 'mail':
        {
          let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!pattern.test(val)) {
            valid = false;
            error = "Invalid email format";
          }
          break;
        }
      case 'phone':
        {
          let pattern = /^\d{10}$/;
          if (!pattern.test(val)) {
            valid = false;
            error = "Phone number must be 10 digits";
          }
          break;
        }
      // Add more validation logic for other fields as needed
      default:
        break;
    }
    return { valid, error };
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    dispatch({ type: 'insert', data: { key, value, touched: true, valid, error } });
  };

  const checkEqual = (key, rpwd) => {
    let valid = true;
    let error = "";
    let pwd = customer.pwd.value;
    if (rpwd !== pwd) {
      valid = false;
      error = "Password is not matching";
    }
    dispatch({ type: 'insert', data: { key, rpwd, touched: true, valid, error } });
  };

  const isFormValid = () => {
    for (let key in customer) {
      if (!customer[key].valid) {
        return false;
      }
    }
    return true;
  };

  const submitData = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(customer));
    const reOption = {
      method: "Post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        login: {
          username: customer.mail.value,
          role_id: 3,
          password: customer.pwd.value,
          flag: true
        },
        customer: {
          first_name: customer.fname.value,
          last_name: customer.lname.value,
          email: customer.mail.value,
          phone_no: customer.phone.value,
          address: customer.add.value,
          city: customer.city.value,
          state: customer.state.value
        }
      })
    };

    fetch("http://localhost:8080/customer", reOption)
      .then(res => {
        if (!res.ok) {
          setMsg("Network response was not ok");
        }
        return res.text();
      })
      .then(data => {
        if (data) {
          navigate('/login', { state: { data } });
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setMsg("Error fetching data:", error);
        alert(msg)
      });
  };

  const clearData = () => {
    dispatch({ type: 'reset' });
    setMsg("");
  };

  return (
    <div className="App">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">New Customer Registration</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label">Enter First Name:</label>
                  <input type="text" className={`form-control ${customer.fname.error ? 'is-invalid' : ''}`} id="fname" value={customer.fname.value} onChange={(e) => handleChange("fname", e.target.value)} onBlur={(e) => handleChange("fname", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.fname.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="lname" className="form-label">Enter Last Name:</label>
                  <input type="text" className={`form-control ${customer.lname.error ? 'is-invalid' : ''}`} id="lname" value={customer.lname.value} onChange={(e) => handleChange("lname", e.target.value)} onBlur={(e) => handleChange("lname", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.lname.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="pwd" className="form-label">Enter Password:</label>
                  <input type="password" className={`form-control ${customer.pwd.error ? 'is-invalid' : ''}`} id="pwd" value={customer.pwd.value} onChange={(e) => handleChange("pwd", e.target.value)} onBlur={(e) => handleChange("pwd", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.pwd.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="rpwd" className="form-label">Re-Enter Password:</label>
                  <input type="password" className={`form-control ${customer.rpwd.error ? 'is-invalid' : ''}`} id="rpwd" value={customer.rpwd.value} onChange={(e) => handleChange("rpwd", e.target.value)} onBlur={(e) => checkEqual("rpwd", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.rpwd.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="mail" className="form-label">Enter Email-Id:</label>
                  <input type="email" className={`form-control ${customer.mail.error ? 'is-invalid' : ''}`} id="mail" value={customer.mail.value} onChange={(e) => handleChange("mail", e.target.value)} onBlur={(e) => handleChange("mail", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.mail.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Enter Phone Number:</label>
                  <input type="number" className={`form-control ${customer.phone.error ? 'is-invalid' : ''}`} id="phone" value={customer.phone.value} onChange={(e) => handleChange("phone", e.target.value)} onBlur={(e) => handleChange("phone", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.phone.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="add" className="form-label">Enter Address:</label>
                  <input type="text" className={`form-control ${customer.add.error ? 'is-invalid' : ''}`} id="add" value={customer.add.value} onChange={(e) => handleChange("add", e.target.value)} onBlur={(e) => handleChange("add", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.add.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">Enter City:</label>
                  <input type="text" className={`form-control ${customer.city.error ? 'is-invalid' : ''}`} id="city" value={customer.city.value} onChange={(e) => handleChange("city", e.target.value)} onBlur={(e) => handleChange("city", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.city.error}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">Enter State:</label>
                  <input type="text" className={`form-control ${customer.state.error ? 'is-invalid' : ''}`} id="state" value={customer.state.value} onChange={(e) => handleChange("state", e.target.value)} onBlur={(e) => handleChange("state", e.target.value)} required />
                  <div className="invalid-feedback" style={{ color: "red" }}>{customer.state.error}</div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-block mt-4" onClick={submitData} disabled={!isFormValid()}>Register</button>
                  <button type="button" className="btn btn-secondary btn-block mt-2" onClick={clearData}>Reset</button>
                </div>
                 
              </form>
              {msg && <p className="text-danger text-center mt-3">{msg}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
