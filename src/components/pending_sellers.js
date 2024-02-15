import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Verify()
{
    const navigate= useNavigate()
   const[login_id,setLogin_id]= useState();
    const [seller,setSeller]= useState([]);
    const getSellers=()=> {
    fetch('http://localhost:8080/getverify',{
        method:'Get',
        headers:{'Content-Type': 'application/json'}
    }).then(res=>res.json())
    .then(data=>setSeller(data))
    .catch(error=>
    {
        console.error('Error fetching data:',error);
    }) 
    
}
// const updateFlag=(item)=>{
//     console.log(item)
//     const reOption={
//         method:"Post",
//         headers: {'content-type':'application/json'},
//         body: JSON.stringify({
//             login_id: item.login_id
//         })
//     }
//     fetch('http://localhost:8080/updateflag',reOption)
//     .then(res=>{res.json()
//     getSellers();
//     })
//     .catch(error=>
//         {
//             console.error('Error updating data',error)
//         })
// }
function updateFlag(item)
{
    console.log(item)
    const reOption={
        method:"Post",
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            
                login_id: item.login_id,
                username: item.username,
                password: item.password
            }
          
        )
    }
    fetch('http://localhost:8080/updateflag',reOption)
    .then(()=>{
        getSellers();
    })
    .catch(error=>
        {
            console.error('Error updating data',error)
        })
}
    const tableCellStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
        alignContent: 'center',
        textSize: '30px'
      };
      useEffect(()=>{
        getSellers();
      },[])
    return(
        <div>
            <table style={{ border:'solid', width: '60%', alignContent: 'center' }}><thead>
                <th style={tableCellStyle}>Seller id</th>
            <th style={tableCellStyle}>Seller Name</th>
            <th style={tableCellStyle}>Business Name</th>
            <th style={tableCellStyle}>GST No</th>
            <th style={tableCellStyle}>Status</th>
            </thead>
            {
                
                seller.map((item,index)=>
                    
                    <tr>
                        <td style={tableCellStyle}>{item.seller_id}</td>
                        <td style={tableCellStyle}>{item.first_name}</td>
                        <td style={tableCellStyle}>{item.business_name}</td>
                        <td style={tableCellStyle}>{item.gst_no}</td>
                        <td style={tableCellStyle} ></td>
                        <td>
                            <input type="button" value="Verify" onClick={()=>{
                                if(item!=null)
                                updateFlag(item.login)}}/>
                        </td>
                    </tr>
                     
                )
            }
            </table>
        </div>
    )
        }
