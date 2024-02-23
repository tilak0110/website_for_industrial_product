import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EditCustomer() {
  const customer = JSON.parse(localStorage.getItem("loggedCustomer"));
  const initialUserState = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    address: customer.address,
    phone_no: customer.phone_no,
    email: customer.email,
    city: customer.city,
    state: customer.state
  };

  const [user, setUser] = useState(initialUserState);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const reOption = {
        method: "Post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          customer_id: customer.customer_id,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          phone_no: user.phone_no,
          login_id: customer.login_id,
          email: user.email,
          city: user.city,
          state: user.state
        })
      };

      fetch("http://localhost:8080/updatecustomer", reOption)
        .then(res => {
          if (res.ok) {
            alert("Profile Updated Successfully.");
            navigate('/CustLand');
          } else
            setMsg("Please Enter Valid Data!!...");
        })
        .catch(error => {
          console.error("Error updating user:", error);
          setMsg("An error occurred while updating user");
        });
    }
  };

  // Function to validate form data
  const validateForm = () => {
    let isValid = true;
    if (!user.first_name || !user.last_name || !user.address || !user.phone_no || !user.email || !user.city || !user.state) {
      setMsg("Please fill in all fields.");
      isValid = false;
    } else if (!isValidEmail(user.email)) {
      setMsg("Please enter a valid email address.");
      isValid = false;
    }
    return isValid;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="container">
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className="container-fluid">
          <Link className='navbar-brand' to="/CustLand">Industrial Products Shop</Link>
          <div className="collapse navbar-collapse">
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to="/viewpro">View Products</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/viewCart">View Cart</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-4">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input type="text"
              className="form-control"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={user.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="phone_no"
              value={user.phone_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City:</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={user.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary me-3">Save Changes</button>
            <button type='reset' className="btn btn-secondary" onClick={() => setUser(initialUserState)}>Reset</button>
          </div>
          {msg && <div className="text-danger">{msg}</div>}
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;

             
