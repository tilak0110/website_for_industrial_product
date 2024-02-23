import { useReducer, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const init = {
  fname: { value: "", touched: false },
  lname: { value: "", touched: false },
  add: { value: "", touched: false },
  city: { value: "", touched: false },
  state: { value: "", touched: false },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'insert':
      const { key, value, touched } = action.data;
      return { ...state, [key]: { value, touched } };
    case 'reset':
      return init;
    default:
      return state;
  }
};

const Seller2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seller = location.state?.seller;
  const [seller2, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");

  const handleChange = (key, value) => {
    dispatch({ type: 'insert', data: { key, value, touched: true } });
  };

  const submitData = (e) => {
    e.preventDefault();
    const reOption = {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        login: {
          username: seller.mail.value,
          role_id: 2,
          password: seller.pwd.value,
          flag: false
        },
        seller: {
          business_name: seller.bname.value,
          gst_no: seller.gst.value,          
          first_name: seller2.fname.value,
          last_name: seller2.lname.value,
          email: seller.mail.value,
          phone_no: seller.phone.value,
          address: seller2.add.value,
          city: seller2.city.value,
          state: seller2.state.value
        }
      })
    };

    fetch("http://localhost:8080/seller", reOption)
      .then(res => {
        if (res.ok)
          navigate('/login');
        else
          setMsg("You have already registered with the same email.");
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  return (
    <div className="container mt-5">
      <h1>Additional details ℹ️</h1>
      <div className="registration-container border border-primary p-4">
        <form>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">Enter First Name:</label>
            <input type="text" className="form-control form-control-sm" id="fname" value={seller2.fname.value} onChange={(e) => handleChange("fname", e.target.value)} onBlur={(e) => handleChange("fname", e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Enter Last Name:</label>
            <input type="text" className="form-control form-control-sm" id="lname" value={seller2.lname.value} onChange={(e) => handleChange("lname", e.target.value)} onBlur={(e) => handleChange("lname", e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="add" className="form-label">Enter Address:</label>
            <input type="text" className="form-control form-control-sm" id="add" value={seller2.add.value} onChange={(e) => handleChange("add", e.target.value)} onBlur={(e) => handleChange("add", e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">Enter City:</label>
            <input type="text" className="form-control form-control-sm" id="city" value={seller2.city.value} onChange={(e) => handleChange("city", e.target.value)} onBlur={(e) => handleChange("city", e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">Enter State:</label>
            <input type="text" className="form-control form-control-sm" id="state" value={seller2.state.value} onChange={(e) => handleChange("state", e.target.value)} onBlur={(e) => handleChange("state", e.target.value)} required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary me-3" onClick={submitData}>Submit</button>
            <button type="button" className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
          </div>
        </form>
      </div>
      <div className="text-danger">{msg}</div>
    </div>
  );
};

export default Seller2;
