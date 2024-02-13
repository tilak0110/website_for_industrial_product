import logo from './logo.svg';
import './App.css';
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
function App() {
const mystate= useSelector(state=>state.logged);
  return (
    <div className="App">
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
    </Routes>
    </div>
  );
}

export default App;
