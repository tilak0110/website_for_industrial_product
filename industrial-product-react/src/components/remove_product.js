import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllProd() {
    const navigate = useNavigate();
    const seller = JSON.parse(localStorage.getItem("loggedSeller"));
    const [product, setProduct] = useState([]);

    const getProducts = () => {
        fetch(`http://localhost:8080/getpro/${seller.seller_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    function Remove(productid) {
        console.log(productid);
        const reOption = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:8080/delpro/${productid}`, reOption)
        .then(() => {
            getProducts();
        })
        .catch(error => {
            console.error('Error deleting data', error);
        });
    }

    function Update(item) {
        navigate('/updatepro', { state: { item } });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="App">
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
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
                                <span className='nav-link'>Welcome {seller && seller.first_name} {seller && seller.last_name}</span>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/editseller">Edit Profile</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productid}</td>
                            <td>{item.productname}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="btn btn-danger me-2" onClick={() => Remove(item.productid)}>Delete</button>
                                <button className="btn btn-primary" onClick={() => Update(item)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
