<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Seller_Page() {
    const [seller, setSeller] = useState(null);

  useEffect(() => {
    const loginid = JSON.parse(localStorage.getItem("loggedUser")).login_id;

    fetch("http://localhost:8080/getSeller?loginid=" + loginid)
      .then(resp => resp.json())
      .then(obj => {
        localStorage.setItem("loggedSeller", JSON.stringify(obj))
        setSeller(obj);
      });
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
                  <Link className='nav-link' to="/managestock">Manage Stock</Link>
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
        <div>
          <header>
            <h1>Welcome to Industrial Products Shop</h1>
          </header>
          <main>
            <section>
              <h2>About Us</h2>
              <p>Welcome to Industrial Products Shop, your one-stop destination for all industrial needs. We offer a wide range of high-quality products to meet your requirements.</p>
            </section>
            <section>
              <h2>Featured Products</h2>
              <div className="featured-products">
                {/* Display some featured products */}
                {/* You can map through an array of featured products and display each one */}
                {/* Example: */}
                {/* {featuredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                  </div>
                ))} */}
              </div>
            </section>
          </main>
          <footer>
            <p>&copy; 2024 Industrial Products Shop</p>
          </footer>
        </div>
      </div>
    );
}
=======
import { Link} from 'react-router-dom';
export default function Seller_Page()
{
    return (
        <div className="App">
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
         <ul className='navbar-nav mr-auto'>
          <li className='nav-item active' > 
          <Link className='nav-link' to="/Register">Add Product</Link>
          </li>
          <li className='nav-item active' >
          <Link className='nav-link' to="/Seller">Remove Product</Link>
          </li>
          <li className='nav-item active' >
          <Link className='nav-link' to="/logout">Logout</Link>
          </li>
          </ul></nav>
          <h1>Seller Page</h1>
          </div>
    )
}
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193
