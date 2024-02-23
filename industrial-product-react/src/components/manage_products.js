// import React, { useState, useEffect } from "react";
// export default function View_product()
// {
//     //const navigate= useNavigate()
//     const seller= JSON.parse(localStorage.getItem("loggedSeller"));
//     const [product,setProduct]= useState([]);
//     const getProducts=()=> {
//     fetch(`http://localhost:8080/getproducts`,{
//         method:'Get',
//         headers:{'Content-Type': 'application/json'}
//     }).then(res=>res.json())
//     .then(data=>setProduct(data))
//     .catch(error=>
//     {
//         console.error('Error fetching data:',error);
//     }) 
    
// }

// function Remove(productid)
// {
//     console.log(productid)
//     const reOption={
//         method:"Delete",
//         headers: {'content-type':'application/json'},  
//     }
//     fetch(`http://localhost:8080/delpro/${productid}`,reOption)
//     .then(()=>{
//         getProducts();
//     })
//     .catch(error=>
//         {
//             console.error('Error updating data',error)
//         })
// }
//     const tableCellStyle = {
//         border: '1px solid #dddddd',
//         padding: '8px',
//         alignContent: 'center',
//         textSize: '30px'
//       };
//       useEffect(()=>{
//         getProducts();
//       },[])
//     return(
//         <div>
//             <table style={{ border:'solid', width: '60%', alignContent: 'center' }}><thead>
//                 <th style={tableCellStyle}>Product_id</th>
//             <th style={tableCellStyle}>Product Name</th>
//             <th style={tableCellStyle}>Description</th>
//             <th style={tableCellStyle}>Price</th>
//             <th style={tableCellStyle}>Stock</th>
//             </thead>
//             {
                
//                 product.map((item,index)=>
                    
//                     <tr>
//                         <td style={tableCellStyle}>{item.productid}</td>
//                         <td style={tableCellStyle}>{item.productname}</td>
//                         <td style={tableCellStyle}>{item.description}</td>
//                         <td style={tableCellStyle}>{item.price}</td>

//                         <td style={tableCellStyle} >{item.stock}</td>
//                         <td>
//                             <input type="button" value="Delete" onClick={()=>{
//                                 if(item!=null)
//                                 Remove(item.productid)}}/>
//                         </td>
//                     </tr>
                     
//                 )
//             }
//             </table>
//         </div>
//     )
//         }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewProduct() {
    const seller = JSON.parse(localStorage.getItem("loggedSeller"));
    const [product, setProduct] = useState([]);

    const getProducts = () => {
        fetch(`http://localhost:8080/getproducts`, {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function Remove(productid) {
        console.log(productid)
        const reOption = {
            method: "Delete",
            headers: { 'content-type': 'application/json' },
        }
        fetch(`http://localhost:8080/delpro/${productid}`, reOption)
        .then(() => {
            getProducts();
        })
        .catch(error => {
            console.error('Error updating data', error)
        })
    }

    useEffect(() => {
        getProducts();
    }, []);

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
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productid}</td>
                            <td>{item.productname}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => Remove(item.productid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
