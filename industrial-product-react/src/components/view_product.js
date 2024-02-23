import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ViewProd() {
    const customer = JSON.parse(localStorage.getItem("loggedCustomer")).customer_id;
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState([]);
    const [quantities, setQuantities] = useState({}); // State for quantities
    const[msg,setMsg]=useState("")
    
    const getProducts = () => {
        fetch('http://localhost:8080/getproducts', {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function getCats() {
        fetch('http://localhost:8080/getcats', {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function getName() {
        if(search === "") {
            setName([]);
        } else {
            fetch(`http://localhost:8080/getsearch?name=${search}`, {
                method: 'Get',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => setName(data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }

    useEffect(() => {
        getCats();
        getProducts();
        getName();
    }, []);

    useEffect(() => {
        getName(); // Call getName whenever 'search' state changes
    }, [search]);

    function handleChange(productId, quantity) {
        setQuantities(prevState => ({
            ...prevState,
            [productId]: quantity
        }));
    }

    const addToCart1 = (productId, uid) => {
        const qty = quantities[productId] || 0; // Get quantity for the product
        fetch(
          "http://localhost:8080/addToCart?pid=" +
            productId +
            "&cid=" +
            uid +
            "&qty=" +
            qty
        )
          .then((resp) => resp.json())
          .then((data) => {
            if (data !== null) {
              setMsg("successfully added to cart");
            } else {
              setMsg("something went wrong");
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
                                <span className='nav-link'>Welcome {customer && customer.first_name} {customer && customer.last_name}</span>
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

            <div className="mt-4">
                <label htmlFor="search" className="form-label">Search</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="search" 
                    value={search} 
                    onChange={(e) => {setSearch(e.target.value)}} 
                /> 
                <ul className="list-group mt-2">
                    {name.map((item, index) => (
                        <li className="list-group-item" key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="form-group mt-4">
                <label htmlFor="categorySelect">Select a category:</label>
                <select id="categorySelect" className="form-select" onChange={(e) => handleChange(e.target.value, 0)}>
                    <option value="">Select...</option>
                    {categories.map(category => (
                        <option key={category.categoryid} value={category.categoryid}>
                            {category.categoryname}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Product_id</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Seller</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productid}</td>
                            <td>{item.productname}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.category ? item.category.categoryname : ''}</td>
                            <td>{item.seller ? item.seller.business_name : ''}</td>
                            
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`qty_${item.productid}`}
                                    name="qty"
                                    value={quantities[item.productid] || 0}
                                    onChange={(e) => handleChange(item.productid, parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => addToCart1(item.productid, customer)}
                                >
                                    Add to Cart
                                </button>
                            </td>
                            <td>Remaining Only {item.stock} Units </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{msg}</p>
        </div>
    );
}
