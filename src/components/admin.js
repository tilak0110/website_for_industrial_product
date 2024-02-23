import { Link} from 'react-router-dom';
function Admin_Page()
{
    return (
        <div className="App">
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
         <ul className='navbar-nav mr-auto'>
          <li className='nav-item active' > 
          <Link className='nav-link' to="/verify">Verify Sellers</Link>
          </li>
          <li className='nav-item active' >
          <Link className='nav-link' to="/Seller">Remove Product</Link>
          </li>
          <li className='nav-item active' >
          <Link className='nav-link' to="/logout">Logout</Link>
          </li>
          </ul></nav>
          <h1>Admin Page</h1></div>
    )
}


export default Admin_Page;