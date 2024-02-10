import {  useReducer, useState} from "react";
import React from 'react';
import { useLocation } from 'react-router-dom';
const init={
    fname : {value:"",touched:false},
    lname :{value:"",touched:false},
    add : {value:"",touched:false},
    city :{value:"",touched:false},
    state : {value:"",touched:false},
    bname : "",
    pwd : "",
    mail : "",
    phone : ""
}
const reducer=(state,action)=>{
    switch(action.type)
    {
    case 'insert' : 
    const {key,value,touched,valid}=action.data;
    return {...state,[key]:{value,touched,valid}}
    case 'reset' :
        return init;
    }
}

const Seller2 = () => {
  const location = useLocation();
  // Retrieve the object passed from Page1
  const seller = location.state?.seller;
  console.log(seller);
  const[seller2,dispatch]= useReducer(reducer,init);
  const handleChange= (key,value)=>{
    
    dispatch({type:'insert',data:{key,value,touched:true}})

}
const [msg,setMsg]= useState("");
    const submitData= (e) =>
    {
        e.preventDefault();
        console.log(JSON.stringify(seller))
        const reOption={
            method:"Post",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
              bname: seller.bname.value,
                gst: seller.gst.value,
                pwd: seller.pwd.value,
                mail: seller.mail.value,
                phone: seller.phone.value,
                fname: seller2.fname.value,
                lname: seller2.lname.value,
                add: seller2.add.value,
                city: seller2.city.value,
                state: seller2.state.value
            })
        }
        console.log("after reoption")
        fetch("http://localhost:9000/insertseller",reOption)
        .then(res=>res.text())
        .then(data=>setMsg(data))
    }
  return (
    <div>
     <h1>Additional Details</h1>
     <div className="registration-container border border-primary">
            <form className="form-container " action="" method="POST">
              
            <div className="form-group">
            <label className="form-label">Enter First Name : </label><br/>
            <input className="form-control-lg" type="text" name="fname" value={seller2.bname.value}
            onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}/>         
            </div>   
            <div className="form-group">
            <label className="form-label">Enter Last Name: </label><br/>
            <input className="form-control-lg" type="text" name="lname" value={seller2.mail.value}
            onChange={(e)=>{handleChange("lname",e.target.value)}} onBlur={(e)=>{handleChange("lname",e.target.value)}}/>   
            </div>   
                
            <div className="form-group">
            <label htmlFor="add" className="form-label">Enter Address : </label><br/>
            <input className="form-control-lg" type="password" name="add" value={seller2.pwd.value} 
            onChange={(e)=>{handleChange("add",e.target.value)}} onBlur={(e)=>{handleChange("add",e.target.value)}}/>  
            </div> 
            <div className="form-group">
            <label className="form-label">Enter City: </label><br/>
            <input className="form-control-lg" type="text" name="city" value={seller2.city.value}
            onChange={(e)=>{handleChange("city",e.target.value)}} onBlur={(e)=>{handleChange("city",e.target.value)}}/>
            </div> 
            <div className="form-group">          
	          <label className="form-label">Enter State : </label><br/>
            <input className="form-control-lg" type="text" name="state" value={seller2.state.value}
            onChange={(e)=>{handleChange("state",e.target.value)}} onBlur={(e)=>{handleChange("state",e.target.value)}}/>
            </div> 
                
          <div className="form-group">
          <input type="button" value="Submit" onClick={(e)=>{submitData(e)}} style={{alignItems:"flex-end"}} />
          </div>                      
                     
            </form>
            </div>
    </div>
  );
};

export default Seller2;