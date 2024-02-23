
import {  useReducer, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../../src/styles/customer_registration.css'
const init={
    fname : {value:"",valid:false,touched:false,error:""},
    lname :{value:"",valid:false,touched:false,error:""},
    pwd :{value:"",valid:false,touched:false,error:""},
    rpwd : {value:"",valid:false,touched:false,error:""},
    mail : {value:"",valid:false,touched:false,error:""},
    add  : {value:"",touched:false,error:""},
    phone : {value:0,valid:false,touched:false,error:""},
    city : {value:"",touched:false,error:""},
    state : {value:"",touched:false,error:""},
    //formValid: false
}
const reducer=(state,action)=>{
    switch(action.type)
    {
    case 'insert' : 
    const {key,value,touched,valid,error}=action.data;
    return {...state,[key]:{value,touched,valid,error}}
    case 'reset' :
        return init;
    }
}

export default function Register()
{
    
    const[customer,dispatch]= useReducer(reducer,init)
    const validateData= (key,val)=>
    {
        let valid = true;
        let error=""
        switch(key)
        {
            case 'fname' :
                {
                    let pattern1 = /^[A-Z]{1}[a-z]{1,}$/
                    console.log(val)
                    console.log(pattern1.test(val))
                    if(!pattern1.test(val))
                    {
                        valid = false;
                        error = "Name should be valid"
                    }
                    else
                    {
                        valid = true;
                        error=""
                    }
                    break
                }
                case 'lname' :
                    {
                        let pattern1 = /^[A-Z]{1}[a-z]{1,}$/
                        console.log(val)
                        console.log(pattern1.test(val))
                        if(!pattern1.test(val))
                        {
                            valid = false;
                            error = "Name should be valid"
                        }
                        else
                        {
                            valid = true;
                            error=""
                        }
                        break
                    }
            case 'pwd' :
                {
                    var pattern2 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
                    console.log(val)
                    console.log(pattern2.test(val))
                    if(!pattern2.test(val))
                    {
                        valid = false;
                        error = "Password should contain at least one character,one digit,one symbol"
                    }
                    else
                    {
                        valid = true;
                        error=""
                    }
                    break
                }
                case 'mail':
                    {
                        var pattern3 = /^[\w._]+@[\w-]{5,10}\.[a-z]{2,3}/
                        console.log(val)
                        console.log(pattern3.test(val))
                        if(!pattern3.test(val))
                        {
                            valid = false;
                            error = "Email should be in proper format"
                        }
                        else
                        {
                            valid = true;
                            error=""
                        }
                        break
                    }
<<<<<<< Updated upstream:src/components/customer_registration.js
=======
                    case 'phone':
                        {
                            var pattern4 = /^\d{10}$/
                            console.log(val)
                            console.log(pattern4.test(val))
                            if(!pattern4.test(val))
                            {
                                valid = false;
                                error = "Enter valid phone number"
                            }
                            else
                            {
                                valid = true;
                                error=""
                            }
                            break
                        }
                    
                  
>>>>>>> Stashed changes:industrial-product-react/src/components/customer_registration.js

        }
        return { valid: valid, error: error}
    }
    const handleChange= (key,value)=>{
        const {valid,error}= validateData(key,value);
        let formValid=true;
        for(let c in customer)
        {
            if(customer[c].valid==false)
            {
                formValid=false;
                break;
            }
        }
    
        dispatch({type:'insert',data:{key,value,touched:true,valid,error}})
    }
    const checkEqual= (key,rpwd)=>{
        let valid = true;
        let error=""
        let pwd= customer.pwd.value;
        if(rpwd!=pwd)
        {
            valid = false;
            error ="Password is not matching"
        }
        dispatch({type:'insert',data:{key,rpwd,touched:true,valid,error}})
    }
   const [msg,setMsg]= useState("");
    const submitData= (e) =>
    {
        e.preventDefault();
        console.log(JSON.stringify(customer))
        const reOption={
            method:"Post",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                login:
                {
                    username: customer.mail.value,
                    role_id:3,
                    password:customer.pwd.value,
                    flag:true
                },
                customer:
                {
                    first_name: customer.fname.value,
                    last_name: customer.lname.value, 
                    email: customer.mail.value,
                    phone_no: customer.phone.value,
                    address: customer.add.value,
                    city: customer.city.value,
                    state: customer.state.value
                }
                
            })
        }
       
        console.log("after reoption")
        fetch("http://localhost:8080/customer",reOption)
        .then(res=>{
            if(!res.ok)
            throw new Error("Network response was not ok")
            res.text();
        })
        .then(data=>navigate('/login',{state:{data}}))
    }
    return(
        <div>
            <h1 className="text-primary">New customer Registration</h1>
            <div className="registration-container border border-primary">
            <form className="form-container " action="" method="POST">
              
                 
                <div className="form-group">
                  
                <label htmlFor="fname" className="form-label">Enter FirstName : </label><br/>
                <small className="help block">{customer.fname.error}</small>
                 <br/> 
                <input className="form-control-lg" type="text" name="fname" value={customer.fname.value}
                 onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}  required/> 
                 </div> 
                  
                 <div className="form-group">  
                  
               	<label htmlFor="lname" className="form-label">Enter LastName :</label><br/>
                <small>{customer.lname.error}</small>  
                <br/>  
              <input className="form-control-lg" type="text" name="lname" value={customer.lname.value} 
                onChange={(e)=>{handleChange("lname",e.target.value)}} onBlur={(e)=>{handleChange("lname",e.target.value)}}  required/>  
                </div> 
                 
                <div className="form-group">
                 
                <label htmlFor="pwd" className="form-label">Enter Password : </label><br/>
                <small className="help-block" color="red">{customer.pwd.error}</small>
                  <br/>
                <input className="form-control-lg" type="password" name="pwd" value={customer.pwd.value} 
                 onChange={(e)=>{handleChange("pwd",e.target.value)}} onBlur={(e)=>{handleChange("pwd",e.target.value)}} required/>  
                </div> 
                 
                <div className="form-group">
                 
                <label className="form-label">Re-Enter Password : </label><br/>
                <small className="help-block" color="red">{customer.rpwd.error}</small>
                 <br/> 
                <input className="form-control-lg" type="password" name="rpwd" value={customer.rpwd.value} 
                onChange={(e)=>{handleChange("rpwd",e.target.value)}} onBlur={(e)=>{checkEqual("rpwd",e.target.value)}} required/>
                 
                </div>  
                <div className="form-group">
                 
               <label className="form-label">Enter Email-Id : </label><br/>
               <small className="help-block" color="red">{customer.mail.error}</small>
                 <br/>
                <input className="form-control-lg" type="email" name="mail" value={customer.mail.value}
                 onChange={(e)=>{handleChange("mail",e.target.value)}} onBlur={(e)=>{handleChange("mail",e.target.value)}} required/>
                  
                </div> 
                 
                <div className="form-group">
                 
	       <label className="form-label">Enter Phone Number : </label><br/>
           <small className="help-block" >{customer.phone.error}</small> 
             <br/>
                <input className="form-control-lg" type="number" name="mail" value={customer.phone.value}
                 onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}} required/>
                               </div> 
                  
             <div className="form-group">
                 
		 <label className="form-label">Enter Address : </label><br/>
         <small className="help-block" color="red">{customer.add.error}</small>  
           <br/>
                <input className="form-control-lg" type="text" name="add" value={customer.add.value}
                 onChange={(e)=>{handleChange("add",e.target.value)}} onBlur={(e)=>{handleChange("add",e.target.value)}} required/>  
                  
                 </div>
                  
                  
                 <div className="form-group">
                     
        <label className="form-label">Enter City : </label><br/>
        <small className="help-block">{customer.city.error}</small>  
          <br/>
                <input className="form-control-lg" type="text" name="city" value={customer.city.value}
                 onChange={(e)=>{handleChange("city",e.target.value)}} onBlur={(e)=>{handleChange("city",e.target.value)}} required/>
                  
          </div>
          <div className="form-group">
                     
                     <label className="form-label">Enter State : </label><br/>
                     <small className="help-block">{customer.state.error}</small>  
                       <br/>
                             <input className="form-control-lg" type="text" name="state" value={customer.state.value}
                              onChange={(e)=>{handleChange("state",e.target.value)}} onBlur={(e)=>{handleChange("state",e.target.value)}} required/>
                               
                       </div>
          <div className="form-group">
                    <input type="button" disabled={(!customer.formValid)} value="Register" onClick={(e)=>{submitData(e)}}/>

                    </div>                      
                     
            </form>
            </div>
            <h4>{msg}</h4>
       
        </div>
    )
}