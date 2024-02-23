import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const init = {
    add: { value: "", touched: false, valid: false },
    city: { value: "", touched: false, valid: false },
    state: { value: "", touched: false, valid: false },
    paymentmode: { value: "", touched: false, valid: false }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'insert':
            const { key, value, touched, valid } = action.data;
            return { ...state, [key]: { value, touched, valid } };
        case 'reset':
            return init;
        default:
            return state;
    }
};

export default function OrderForm() {
    const navigate = useNavigate()
    const location = useLocation();
    const [cartitems, setCartitems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("")
    useEffect(() => {
        if (location.state) {
            const { cartitems, price } = location.state;
            setCartitems(cartitems);
            setTotalPrice(price);
        }
    }, [location.state]);

    function handleConfirmOrder() {
        const reOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order: {
                    address: order.add.value,
                    city: order.city.value,
                    state: order.state.value,
                    paymentmode: order.paymentmode.value,
                    price: totalPrice
                },
                cartitems: cartitems

            })
        }

        fetch("http://localhost:8080/create", reOption)
            .then(res => {
                if (res.ok) {
                    setMsg("order placed successfully")
                    alert("Order placed successfully")
                    navigate('/CustLand')
                }
                else
                    setMsg("Order is not placed")
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'insert',
            data: {
                key: name,
                value: value,
                touched: true,
                valid: value !== '' // You can implement validation logic here
            }
        });
    };

    return (
        <div className="App">
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <Link className='navbar-brand' to="/">Industrial Products Shop</Link>
                    <div className="collapse navbar-collapse">
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/viewpro">View Products</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/viewCart">View Cart</Link>
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
                        <th scope="col">SrNo</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Seller</th>
                    </tr>
                </thead>
                <tbody>
                    {cartitems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.product.productname}</td>
                            <td>{item.product.description}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.seller ? item.product.seller.business_name : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h6>Total Price: {totalPrice}</h6>

            <form>
                <div className="mb-3">
                    <label htmlFor="add" className="form-label">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="add"
                        name="add"
                        value={order.add.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={order.city.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={order.state.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentmode" className="form-label">Payment Mode:</label>
                    <select
                        className="form-select"
                        id="paymentmode"
                        name="paymentmode"
                        value={order.paymentmode.value}
                        onChange={handleChange}
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>Confirm Order</button>
            </form>
            <div className="mt-3">{msg}</div>
        </div>
    );
}
