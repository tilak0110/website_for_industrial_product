import { Link } from 'react-router-dom';

function Admin_Page() {
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
                <Link className='nav-link' to="/verify">Verify Sellers</Link>
              </li>
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
      <h1 className="mb-4">Welcome, Admin!</h1>
    </div>
  )
}

export default Admin_Page;
