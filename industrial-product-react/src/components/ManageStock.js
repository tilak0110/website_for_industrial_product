import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ManageStock() {
    const navigate = useNavigate();
    const seller = JSON.parse(localStorage.getItem("loggedSeller"));
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        fetch(`http://localhost:8080/getpro/${seller.seller_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const tableCellStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
        alignContent: 'center',
        textSize: '30px'
    };

    const updateStock = (product, newStock) => {
        console.log(product,newStock)
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                productid: product.productid,
                productname: product.productname,
                price: product.price,
                stock: product.stock,
                description: product.description
            })
        };
        fetch(`http://localhost:8080/updatestock`, requestOptions)
        .then(() => {
            // After successful update, fetch products again to reflect changes
            getProducts();
        })
        .catch(error => {
            console.error('Error updating stock:', error);
        });
    };

    return (
        <div>
            <table style={{ border: 'solid', width: '60%', alignContent: 'center' }}>
                <thead>
                    <tr>
                        <th style={tableCellStyle}>Product_id</th>
                        <th style={tableCellStyle}>Product Name</th>
                        <th style={tableCellStyle}>Description</th>
                        <th style={tableCellStyle}>Price</th>
                        <th style={tableCellStyle}>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td style={tableCellStyle}>{product.productid}</td>
                            <td style={tableCellStyle}>{product.productname}</td>
                            <td style={tableCellStyle}>{product.description}</td>
                            <td style={tableCellStyle}>{product.price}</td>
                            <td style={tableCellStyle}>
                                <input 
                                    type="number" 
                                    value={product.stock} 
                                    onChange={(e) => {
                                        const newStock = e.target.value;
                                        // Update the stock value locally first
                                        const updatedProducts = [...products];
                                        updatedProducts[index].stock = newStock;
                                        setProducts(updatedProducts);
                                    }}
                                />
                            </td>
                            <td>
                                <input 
                                    type="button" 
                                    value="Update" 
                                    onClick={() => updateStock(product, product.stock)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
