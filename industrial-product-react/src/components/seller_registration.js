import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const init = {
  gst: { value: "", valid: false, touched: false, error: "" },
  bname: { value: "", valid: false, touched: false, error: "" },
  pwd: { value: "", valid: false, touched: false, error: "" },
  rpwd: { value: "", valid: false, touched: false, error: "" },
  mail: { value: "", valid: false, touched: false, error: "" },
  phone: { value: "", valid: false, touched: false, error: "" },
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

export default function Seller() {
  const navigate = useNavigate();
  const [seller, dispatch] = useReducer(reducer, init);
  const [serverError, setServerError] = useState("");

  const validateData = (key, val) => {
    let valid = true;
    let error = "";
    switch (key) {
      case 'gst':
        {
          var pattern1 = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/;
          if (!pattern1.test(val)) {
            valid = false;
            error = "Please enter a valid GST number.";
          }
          break;
        }
      case 'pwd':
        {
          var pattern2 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
          if (!pattern2.test(val)) {
            valid = false;
            error = "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character. It must be at least 8 characters long.";
          }
          break;
        }
      case 'mail':
        {
          var pattern3 = /^[\w._]+@[\w-]{5,10}\.[a-z]{2,3}/;
          if (!pattern3.test(val)) {
            valid = false;
            error = "Please enter a valid email address.";
          }
          break;
        }
      case 'phone':
        {
          var pattern4 = /^\d{10}$/;
          if (!pattern4.test(val)) {
            valid = false;
            error = "Please enter a valid 10-digit phone number.";
          }
          break;
        }
    }
    return { valid: valid, error: error }
  };

  const handleChange = (key, value) => {
    const { valid, error } = validateData(key, value);
    dispatch({ type: 'insert', data: { key, value, touched: true, valid, error } })
  };

  const checkEqual = (key, rpwd, pwd) => {
    let valid = true;
    let error = "";
    if (rpwd !== pwd) {
      valid = false;
      error = "Passwords do not match.";
    }
    dispatch({ type: 'insert', data: { key, rpwd, touched: true, valid, error } })
  };

  const submitData = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(seller));
    // Mock server error for demonstration
    setServerError("Error: Failed to register. Please try again later.");
    // Uncomment below line and remove the line above to handle actual server response
    navigate('/Seller2', { state: { seller } });
  };

  const clearData = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
      <h1 className="display-4 text-center"><span style={{ textAlign: 'center' }}>      New Seller Registration ✅</span></h1>
        <div className="col-md-6">
          <form onSubmit={submitData}>
            <div className="mb-3">
              <label htmlFor="bname" className="form-label">Enter Business Name:</label>
              <input type="text" className="form-control" id="bname" value={seller.bname.value} onChange={(e) => handleChange("bname", e.target.value)} onBlur={(e) => handleChange("bname", e.target.value)} required />
              <small className="text-danger">{seller.bname.error}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="mail" className="form-label">Enter Email-Id:</label>
              <input type="email" className="form-control" id="mail" value={seller.mail.value} onChange={(e) => handleChange("mail", e.target.value)} onBlur={(e) => handleChange("mail", e.target.value)} required />
              <small className="text-danger">{seller.mail.error}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Enter Password:</label>
              <input type="password" className="form-control" id="pwd" value={seller.pwd.value} onChange={(e) => handleChange("pwd", e.target.value)} onBlur={(e) => handleChange("pwd", e.target.value)} required />
              <small className="text-danger">{seller.pwd.error}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="rpwd" className="form-label">Re-Enter Password:</label>
              <input type="password" className="form-control" id="rpwd" value={seller.rpwd.value} onChange={(e) => handleChange("rpwd", e.target.value, seller.pwd.value)} onBlur={(e) => checkEqual("rpwd", e.target.value, seller.pwd.value)} required />
              <small className="text-danger">{seller.rpwd.error}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="gst" className="form-label">Enter GST No:</label>
              <input type="text" className="form-control" id="gst" value={seller.gst.value} onChange={(e) => handleChange("gst", e.target.value)} onBlur={(e) => handleChange("gst", e.target.value)} required />
              <small className="text-danger">{seller.gst.error}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Enter Phone Number:</label>
              <input type="text" className="form-control" id="phone" value={seller.phone.value} onChange={(e) => handleChange("phone", e.target.value)} onBlur={(e) => handleChange("phone", e.target.value)} required />
              <small className="text-danger">{seller.phone.error}</small>
            </div>
            <div className="mb-3 d-grid">
              <button type="submit" className="btn btn-primary">Next</button>
              <button type="button" className="btn btn-secondary" onClick={clearData}>Clear</button>
            </div>
            {serverError && <div className="text-danger">{serverError}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}
