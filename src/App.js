import logo from './logo.svg';
import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Register from './components/customer_registration';
import Seller from './components/seller_registration';
import Seller2 from './components/seller_registration2';

function App() {
  return (
    <div className="App">
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
     <ul className='navbar-nav mr-auto'>
      <li className='nav-item active' > 
      <Link className='nav-link' to="/Register">Customer Registration</Link>
      </li>
      <li className='nav-item active' >
      <Link className='nav-link' to="/Seller">Seller Registration</Link>
      </li>
      {/* <li className='nav-item' >
      <Link to="/Empform" >Employee Form</Link>
      </li>
      <li className='nav-item' >
      <Link to="/Bookform" >Form</Link>
      </li> */}
    </ul>
    </nav>
    <Routes>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/Seller'  element={<Seller/>}></Route>
      <Route path='/Seller2' element={<Seller2/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
