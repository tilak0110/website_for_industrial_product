import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Link to="/login" className="nav-link">Login Page</Link>
      
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
