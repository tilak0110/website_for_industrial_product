import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

<<<<<<< HEAD
import Content from './components/Content';
import Register from './components/customer_registration';
import Seller from './components/seller_registration';
import Seller2 from './components/seller_registration2';
import Seller_Page from './components/Seller_Page';
import Customer_Page from './components/customer_page';
import LogoutComp from './components/LogoutComp';
import Verify from './components/pending_seller';
import Admin_Page from './components/Admin';
import Addproduct from './components/AddProduct';
import AllProd from './components/remove_product';
import ViewProd from './components/view_product';
import Registration from './components/Registration';
import View_product from './components/manage_products';
import AddCategory from './components/addcategory';
import UpdatePro from './components/update_Product';
import ManageStock from './components/ManageStock';
import Home from './components/Home';
import Login from './components/Login';
import EditCustomer from './components/EditCustomer';
import ViewCart from './components/ViewCart';
import EditSeller from './components/EditSeller';
import OrderForm from './components/OrderForm';
import Feedback from './components/feedback';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
=======
import './App.css';
<<<<<<< Updated upstream
import Login from './component/Login';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193

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
  const mystate = useSelector(state => state.logged);
  
  return (
    <div className="App">
<<<<<<< HEAD
        
        <div style={{ display: mystate.loggedIn ? 'none' : 'block' }}>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
              <Link className='navbar-brand' to="/">Home</Link>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to="/registration">Registration</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/logout' element={<LogoutComp />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Seller' element={<Seller />} />
            <Route path='/Seller2' element={<Seller2 />} />
            <Route path='/login' element={<Login />} />
            <Route path='/SellerLand' element={<Seller_Page />} />
            <Route path='/CustLand' element={<Customer_Page />} />
            <Route path='/editcustomer' element={<EditCustomer/>}></Route>
            <Route path='/viewCart' element={<ViewCart/>}/>
            <Route path='/editseller' element={<EditSeller/>}/>
            <Route path='/updateProduct' element={<UpdatePro/>}/>
            <Route path='/appprod' element={<AllProd/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            
            <Route path='/verify' element={<Verify />} />
            <Route path='/admin' element={<Admin_Page />} />
            <Route path='/addpro' element={<Addproduct />} />
            <Route path='/getpro' element={<AllProd />} />
            <Route path='/viewpro' element={<ViewProd />} />
            <Route path='/view' element={<View_product />} />
            <Route path='/addcat' element={<AddCategory />} />
            <Route path='/updatepro' element={<UpdatePro />} />
            <Route path='/content' element={<Content />} />
            <Route path='/managestock' element={<ManageStock />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/orderform' element={<OrderForm/>}></Route>
            <Route path='/feedback' element={<Feedback/>}></Route>
          </Routes>
        
=======
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
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193
    </div>
  );
}

export default App;
