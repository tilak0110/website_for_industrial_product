import { useReducer, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const init = {
  pname: { value: "", valid: false, touched: false, error: "" },
  desc: { value: "", valid: false, touched: false, error: "" },
  price: { value: "", valid: false, touched: false, error: "" },
  stock: { value: "", valid: false, touched: false, error: "" },
  categoryid: { value: "", valid: false, touched: false, error: "" }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'insert':
      const { key, value, touched, valid, error } = action.data;
      return { ...state, [key]: { value, touched, valid, error } };
    case 'reset':
      return init;
    default:
      return state;
  }
}

export default function Addproduct() {
  const navigate = useNavigate();
  const [product, dispatch] = useReducer(reducer, init);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState([]);
  const seller = JSON.parse(localStorage.getItem("loggedSeller"));
  const [msg, setMsg] = useState("");

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

  useEffect(() => {
    getCats();
  }, []);

  const handleChange = (key, value) => {
    dispatch({ type: 'insert', data: { key, value, touched: true } });
  }

  const submitData = (e) => {
    e.preventDefault();
    console.log(product);

    const requestOptions = {
      method: "Post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productname: product.pname.value,
        seller: seller.seller_id,
        description: product.desc.value,
        price: product.price.value,
        stock: product.stock.value,
        category: { categoryid: product.categoryid.value }
      })
    };

    fetch("http://localhost:8080/pro", requestOptions)
      .then(res => res.text())
      .then(obj => {
        const fd = new FormData();
        alert(obj);
        fd.append("file", file);
        const reqOptions = {
          method: "Post",
          headers: { 'content-type': 'multipart/form-data' },
          body: fd
        };

        fetch("http://localhost:8080/uploadImage/" + obj.productid, reqOptions)
          .then(res => res.json())
          .then(data => console.log(JSON.stringify(data)))
          .catch(error => {
            console.error("Error fetching data:", error);
            setMsg("An error occurred while adding");
          });

        alert("uploaded image");
        navigate('/SellerLand');
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setMsg("An error occurred while adding");
      });
  }

  return (
  <div> <nav className='navbar navbar-expand-lg navbar-light bg-light'>
  <div className="container-fluid">
      <Link className='navbar-brand' to="/">Industrial Products Shop</Link>
      <div className="collapse navbar-collapse">
          <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                  <Link className='nav-link' to="/appprod">View Products</Link>
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
    <div className="container mt-5">
      <h1 className="text-primary">Add Product</h1>
      <div className="registration-container border border-primary p-4">
        <form onSubmit={submitData}>
          <div className="mb-3">
            <label htmlFor="categorySelect" className="form-label">Select a category:</label>
            <select id="categorySelect" className="form-select" value={product.categoryid.value} onChange={(e) => handleChange("categoryid", e.target.value)}>
              <option value="">Select...</option>
              {categories.map(category => (
                <option key={category.categoryid} value={category.categoryid}>{category.categoryname}</option>
              ))}
            </select>
            <small className="text-danger">{product.categoryid.error}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="pname" className="form-label">Enter Product Name:</label>
            <input type="text" className="form-control" id="pname" value={product.pname.value} onChange={(e) => handleChange("pname", e.target.value)} onBlur={(e) => handleChange("pname", e.target.value)} required />
            <small className="text-danger">{product.pname.error}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Enter Product Description:</label>
            <input type="text" className="form-control" id="desc" value={product.desc.value} onChange={(e) => handleChange("desc", e.target.value)} onBlur={(e) => handleChange("desc", e.target.value)} required />
            <small className="text-danger">{product.desc.error}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Enter Price:</label>
            <input type="text" className="form-control" id="price" value={product.price.value} onChange={(e) => handleChange("price", e.target.value)} onBlur={(e) => handleChange("price", e.target.value)} required />
            <small className="text-danger">{product.price.error}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Enter Stock:</label>
            <input type="number" className="form-control" id="stock" value={product.stock.value} onChange={(e) => handleChange("stock", e.target.value)} onBlur={(e) => handleChange("stock", e.target.value)} required />
            <small className="text-danger">{product.stock.error}</small>
          </div>
          <div className="mb-3">
            <label htmlFor="picture" className="form-label">Upload Picture:</label>
            <input type="file" className="form-control" id="picture" name="picture" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <h4>{msg}</h4>
    </div>
    </div>
  );
}
