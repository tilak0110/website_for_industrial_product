import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState([]);

  const getSellers = () => {
    fetch('http://localhost:8080/getverify', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setSeller(data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  function removeFlag(item) {
    const reOption1 = {
      method: "Post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        login_id: item.login_id,
        username: item.username,
        password: item.password
      })
    };
    fetch('http://localhost:8080/removeflag', reOption1)
      .then(() => {
        getSellers();
      })
      .catch(error => {
        console.error('Error updating data', error);
      });
  }

  function updateFlag(item) {
    alert("update")
    const reOption = {
      method: "Post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        login_id: item.login_id,
        username: item.username,
        password: item.password
      })
    };
    fetch('http://localhost:8080/updateflag', reOption)
      .then(() => {
        getSellers();
      })
      .catch(error => {
        console.error('Error updating data', error);
      });
  }

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <div className="App">
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className="container-fluid">
          <Link className='navbar-brand' to="/admin">Admin DashBoard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className='navbar-nav'>
              
              <li className='nav-item'>
                <Link className='nav-link' to="/view">Manage Products</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/addcat">Add Category</Link>
              </li>
            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Seller ID</th>
                <th scope="col">Seller Name</th>
                <th scope="col">Business Name</th>
                <th scope="col">GST No</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seller.map((item, index) => (
                <tr key={index}>
                  <td>{item.seller_id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.business_name}</td>
                  <td>{item.gst_no}</td>
                  <td>
                    <button className="btn btn-success me-2" onClick={() => updateFlag(item.login)}>Verify</button>
                    <button className="btn btn-danger" onClick={() => removeFlag(item.login)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
