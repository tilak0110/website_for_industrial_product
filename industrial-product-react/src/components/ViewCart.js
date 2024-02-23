import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ViewCart() {
    const navigate = useNavigate();
    const customer = JSON.parse(localStorage.getItem("loggedCustomer"));
    const [cartitems, setCartitems] = useState([]);
    const [msg, setMsg] = useState("");
    var total = 0;

    const sum = (e) => {
        total += e;
    };

    const getProducts = () => {
        fetch(`http://localhost:8080/getitems/${customer.customer_id}`, {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setCartitems(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleQuantityChange = (index, event, product) => {
        if (parseInt(event.target.value) > product.stock) {
            setMsg(`Maximum quantity should be less than ${product.stock} for ${product.productname}`);
        }
        const updatedCartItems = [...cartitems];
        updatedCartItems[index].quantity = parseInt(event.target.value);
        setCartitems(updatedCartItems);
    };

    const tableCellStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
        alignContent: 'center',
        textSize: '30px'
    };

    function handleClick() {
        const totalPrice = cartitems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        navigate('/orderform', { state: { cartitems, price: totalPrice } });
    }

    function DeleteItem(item) {
        const reOption = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:8080/delitem/${item.id}`, reOption)
        .then(() => {
            getProducts();
        })
        .catch(error => {
            console.error('Error deleting data', error);
        });
    }

    return (
        <div className="App">
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <Link className='navbar-brand' to="/CustLand">Industrial Products Shop</Link>
                    <div className="collapse navbar-collapse">
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/viewpro">View Products</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/editcustomer">Edit Profile</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>SrNo</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Seller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartitems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.product.productname}</td>
                            <td>{item.product.description}</td>
                            <td>{item.product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.quantity}
                                    min={1}
                                    max={item.product.stock || 9999}
                                    onChange={(event) => handleQuantityChange(index, event, item.product)}
                                />
                            </td>
                            <td>{item.product.seller ? item.product.seller.business_name : ''}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => DeleteItem(item)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="totprice">Total price</label>
                <input
                    type="number"
                    id="totprice"
                    name="totprice"
                    className="form-control"
                    value={total}
                    readOnly
                />
            </div>
            <div className="mt-3">
                <button
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Order
                </button>
            </div>
            <h6 className="mt-3">{msg}</h6>
        </div>
    );
}
