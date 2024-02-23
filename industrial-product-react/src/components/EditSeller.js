import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EditSeller() {
  // Retrieve seller data from localStorage
  const customer = JSON.parse(localStorage.getItem("loggedSeller"));
  
  // Initialize user state with seller data
  const initialUserState = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    address: customer.address,
    phone_no: customer.phone_no,
    email: customer.email,
    city: customer.city,
    state: customer.state
  };

  // State variables
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      const reOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: customer.seller_id,
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
  
      fetch("http://localhost:8080/updateseller", reOption)
        .then(res => {
          if (res.ok) {
            alert("Profile Updated Successfully.")
            navigate('/SellerLand');
          } else {
            setErrors({ general: "An error occurred. Please try again later." });
          }
        })
        .catch(error => {
          console.error("Error updating user:", error);
          setErrors({ general: "An error occurred. Please try again later." });
        });
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.first_name.trim()) {
      errors.first_name = "First name is required";
      isValid = false;
    }

    // Add validation for other fields as needed

    setErrors(errors);
    return isValid;
  };

  return (
    <div className='App'> <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <div className="container-fluid">
        <Link className='navbar-brand' to="/">Industrial Products Shop</Link>
        <div className="collapse navbar-collapse">
            <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/appprod">View Products</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/addpro">Add Product</Link>
                </li>
                <li className='nav-item'>
                    <span className='nav-link'>Welcome {customer && customer.first_name} {customer && customer.last_name}</span>
                </li>
               
                <li className='nav-item'>
                    <Link className='nav-link' to="/logout">Logout</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
      <div className="container mt-4">
       
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className={`form-control ${errors.first_name && 'is-invalid'}`}
            />
            {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className={`form-control ${errors.last_name && 'is-invalid'}`}
            />
            {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className={`form-control ${errors.address && 'is-invalid'}`}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              name="phone_no"
              value={user.phone_no}
              onChange={handleChange}
              className={`form-control ${errors.phone_no && 'is-invalid'}`}
            />
            {errors.phone_no && <div className="invalid-feedback">{errors.phone_no}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`form-control ${errors.email && 'is-invalid'}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">City:</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className={`form-control ${errors.city && 'is-invalid'}`}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">State:</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              className={`form-control ${errors.state && 'is-invalid'}`}
            />
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="reset" className="btn btn-secondary ms-2" onClick={() => setUser(initialUserState)}>Reset</button>
          {errors.general && <p className="text-danger mt-2">{errors.general}</p>}
        </form>
      </div>
      </div>
    
    
  );
}

export default EditSeller;
