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
          </ul></nav></div>
    )
}