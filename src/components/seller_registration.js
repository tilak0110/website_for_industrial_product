import {  useReducer, useState} from "react";
import { useNavigate } from "react-router-dom";
const init={
    gst :{value:"",valid:false,touched:false,error:""},
    bname :{value:"",valid:false,touched:false,error:""},
    pwd :{value:"",valid:false,touched:false,error:""},
    rpwd : {value:"",valid:false,touched:false,error:""},
    mail : {value:"",valid:false,touched:false,error:""},
    phone : {value:0,valid:false,touched:false,error:""},
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
export default function Seller() 
{
    const navigate = useNavigate();
    const[seller,dispatch]= useReducer(reducer,init);
    const validateData= (key,val)=>
    {
        let valid = true;
        let error=""
        switch(key)
        {
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
                    case 'phone':
                        {
                            var pattern4 = /^\d{10}$/
                            console.log(val)
                            console.log(pattern4.test(val))
                            if(!pattern4.test(val))
                            {
                                valid = false;
                                error = "Enter 10 digit phone number"
                            }
                            else
                            {
                                valid = true;
                                error=""
                            }
                            break
                        }
    
        }
        return { valid: valid, error: error}
    }
    const handleChange= (key,value)=>{
        const {valid,error}= validateData(key,value);
    
    
        dispatch({type:'insert',data:{key,value,touched:true,valid,error}})
    }
    const checkEqual= (key,rpwd,pwd)=>{
        let valid = true;
        let error=""
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
        console.log(JSON.stringify(seller))
        navigate('/Seller2', { state: { seller } });
    }
    return(
        <div>
            <h1 className="text-primary">New seller Registration</h1>
            <div className="registration-container border border-primary">
            <form className="form-container " action="" method="POST">
              
            <div className="form-group">
                     
                     <label className="form-label">Enter Business Name : </label><br/>
                     <small className="error">{seller.bname.error}</small> <br/>
                     <input className="form-control-lg" type="text" name="bname" value={seller.bname.value}
                     onChange={(e)=>{handleChange("bname",e.target.value)}} onBlur={(e)=>{handleChange("bname",e.target.value)}} required/>         
                       </div>   
                <div className="form-group">
                 <label className="form-label">Enter Email-Id : </label><br/>
                 <small className="error" color="red">{seller.mail.error}</small><br/>
                  <input className="form-control-lg" type="email" name="mail" value={seller.mail.value}
                   onChange={(e)=>{handleChange("mail",e.target.value)}} onBlur={(e)=>{handleChange("mail",e.target.value)}} required/>   
                  </div>   
                <div className="form-group">
                 
                <label htmlFor="pwd" className="form-label">Enter Password : </label><br/>
                <small className="error" color="red">{seller.pwd.error}</small><br/>
                  
                <input className="form-control-lg" type="password" name="pwd" value={seller.pwd.value} 
                 onChange={(e)=>{handleChange("pwd",e.target.value)}} onBlur={(e)=>{handleChange("pwd",e.target.value)}} required/>  
                </div> 
                 
                <div className="form-group">
                 
                <label className="form-label">Re-Enter Password : </label><br/>
                <small className="error" color="red">{seller.rpwd.error}</small><br/>
                  
                <input className="form-control-lg" type="password" name="rpwd" value={seller.rpwd.value} 
                onChange={(e)=>{handleChange("rpwd",e.target.value,seller.pwd.value)}} onBlur={(e)=>{checkEqual("rpwd",e.target.value,seller.pwd.value)}} required/>
                 
                </div>  
                <div className="form-group">
                 <label className="form-label">Enter GST No: </label><br/>
                 <input className="form-control-lg" type="text" name="gst" value={seller.gst.value}
                 onChange={(e)=>{handleChange("gst",e.target.value)}} onBlur={(e)=>{handleChange("gst",e.target.value)}} required/>
                 </div> 
                
                <div className="form-group">          
	       <label className="form-label">Enter Phone Number : </label><br/>
           <small className="error" >{seller.phone.error}</small> <br/>
           <input className="form-control-lg" type="number" name="phone" value={seller.phone.value}
           onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}} required/>
           </div> 
                
          <div className="form-group">
          <input type="button" value="Next" onClick={(e)=>{submitData(e)}} style={{alignItems:"flex-end"}} />
          </div>                      
                     
            </form>
            </div>
            <h4>{msg}</h4>
        </div>
    )
}

