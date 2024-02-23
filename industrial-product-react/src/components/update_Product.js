import {  useEffect, useState} from "react";
import {React} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export default function UpdatePro()
{
    
    const [categories, setCategories] = useState([]);
    function getCats()
    {
        fetch('http://localhost:8080/getcats',{
            method:'Get',
            headers:{'Content-Type': 'application/json'}
        }).then(res=>res.json())
        .then(data=>setCategories(data))
        .catch(error=>
        {
            console.error('Error fetching data:',error);
        }) 
      
    }
    useEffect(()=>{
        getCats();
      },[])
    const location = useLocation()
    const product = location.state?.item;
  
    const initialProState = {
        productid: product.productid,
        productname: product.productname,
        price: product.price,
        stock: product.stock,
        description: product.description,
        categoryid: product.category.categoryid
      };
      const [pro, setPro] = useState(initialProState);
      const handleChange = (e) => {
        const { name, value } = e.target;
  setPro(prevState => ({
    ...prevState,
    [name]: value
  }));
      };
      const [msg,setMsg]= useState("");
      const navigate = useNavigate();
      const handleSubmit = (e) => {
        console.log(pro)
        e.preventDefault();
        const reOption = {
          method: "Post",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
          
            productid: pro.productid,
            productname: pro.productname,
            price: pro.price,
            stock: pro.stock,
            description: pro.description,
            category:pro.categoryid
            
          
          })
         
        }
        console.log(reOption)
        fetch("http://localhost:8080/updatepro", reOption)
        .then(res => {
          if (res.ok) {
            alert("Profile Updated Successfully.")
            navigate('/SellerLand');
          } else
            setMsg("Please Enter Valid Data!!...")
        })
        .catch(error => {
          console.error("Error updating user:", error);
          setMsg("An error occurred while updating user");
        });
        console.log('Updated user:', product);
    };



      return (
        <div>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
          <label htmlFor="categorySelect">Select a category:</label>
                <select id="categorySelect" value={pro.categoryid} onChange={handleChange} readOnly>
  <option value="">Select...</option>
  {categories.map(category => (
    <option key={category.categoryid} value={category.categoryid}>
      {category.categoryname}
    </option>
  ))}
</select>
            <div>
              <label>Product Id:</label>
              <input type="" name="productid" value={pro.productid}
                onChange={handleChange} 
              readOnly/>
            </div>
            <div>
              <label>Product Name:</label>
              <input
                type="text"
                name="productname"
                value={pro.productname}
                onChange={handleChange}
              readOnly/>
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={pro.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={pro.stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={pro.description}
                onChange={handleChange}
              />
            </div>
           
            <button type="submit">Save Changes</button>
            <button type='reset' onClick={() => setPro(initialProState)}>Reset</button>
    
          </form>
          <div>
            {msg}
          </div>
        </div>
      );

}