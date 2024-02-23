import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const init = {
    cname: { value: "", valid: false, touched: false, error: "" },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "insert":
            const { key, value, touched, valid, error } = action.data;
            return { ...state, [key]: { value, touched, valid, error } };
        case "reset":
            return init;
        default:
            return state;
    }
};

export default function AddCategory() {
    const navigate = useNavigate();
    const [category, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");

    const handleChange = (key, value) => {
        dispatch({ type: "insert", data: { key, value, touched: true } });
    };

    const submitData = (e) => {
        e.preventDefault();
        const reOption = {
            method: "Post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                categoryname: category.cname.value,
            }),
        };
        
        fetch("http://localhost:8080/addcat", reOption)
            .then((res) => res.text())
            .then(() => navigate("/admin"))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setMsg("An error occurred while adding");
            });
    };

    return (<div><nav className='navbar navbar-expand-lg navbar-light bg-light'>
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
          
        </ul>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
        <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
            <div className="card p-4">
                <h1 className="text-primary mb-4">Add Category</h1>
                <form onSubmit={submitData}>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Enter Category:
                        </label>
                        <input
                            type="text"
                            id="category"
                            className={`form-control ${category.cname.error ? "is-invalid" : ""}`}
                            value={category.cname.value}
                            onChange={(e) => handleChange("cname", e.target.value)}
                            onBlur={(e) => handleChange("cname", e.target.value)}
                            required
                        />
                        <div className="invalid-feedback">{category.cname.error}</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Category</button>
                    
                </form>
                <h4 className="mt-3 text-danger">{msg}</h4>
            </div>
        </div>
        </div>
    );
}
