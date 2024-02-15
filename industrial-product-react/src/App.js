
import './App.css';
<<<<<<< Updated upstream
import Login from './component/Login';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

=======
import { Link, Route,Routes } from 'react-router-dom';
import Register from './components/customer_registration';
import Seller from './components/seller_registration';
import Seller2 from './components/seller_registration2';
import Login1 from './components/Login';
import Seller_Page from './components/Seller_Page';
import Customer_Page from './components/customer_page';
import HomePage from './components/Home';
import LogoutComp from './components/LogoutComp';
import {useSelector} from 'react-redux';
import Admin_Page from './components/admin';
import Verify from './components/pending_sellers';
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream

      <Link to="/login" className="nav-link">Login Page</Link>
      
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
=======
      <div style={{display:mystate.loggedIn ? "none" : "block"}}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
     <ul className='navbar-nav mr-auto'>
      <li className='nav-item active' > 
      <Link className='nav-link' to="/Register">Customer Registration</Link>
      </li>
      <li className='nav-item active' >
      <Link className='nav-link' to="/Seller">Seller Registration</Link>
      </li>
      <li className='nav-item active' >
      <Link className='nav-link' to="/login">Login</Link>
      </li>
      {/* <li className='nav-item' >
      <Link to="/Empform" >Employee Form</Link>
      </li>
      <li className='nav-item' >
      <Link to="/Bookform" >Form</Link>
      </li> */}
    </ul>
    </nav>
    </div>
    <Routes>
    <Route path='/' element={<HomePage/>}></Route>
      <Route path='/logout'  element={<LogoutComp/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/Seller'  element={<Seller/>}></Route>
      <Route path='/Seller2' element={<Seller2/>}></Route>
      <Route path='/login' element={<Login1/>}></Route>
      <Route path='/SellerLand' element={<Seller_Page/>}></Route>
      <Route path='/CustLand' element={<Customer_Page/>}></Route>
      <Route path='/admin' element={<Admin_Page/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
    </Routes>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
