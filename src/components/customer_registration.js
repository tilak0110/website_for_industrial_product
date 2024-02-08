
import { customereducer, useReducer, useState } from "react"
const init={
    fname : {value:"",valid:false,touched:false,error:""},
    lname :{value:"",valid:false,touched:false,error:""},
    pwd :{value:"",valid:false,touched:false,error:""},
    rpwd : {value:"",valid:false,touched:false,error:""},
    mail : {value:"",valid:false,touched:false,error:""},
    add  : {value:"",valid:false,touched:false,error:""},
    phone : {value:0,valid:false,touched:false,error:""}

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
        console.log(JSON.stringify(customer))
        const reOption={
            method:"Post",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                usid: customer.usid.value,
                uname: customer.uname.value,
                pwd: customer.pwd.value,
                mail: customer.mail.value,
            })
        }
        console.log("after reoption")
        fetch("http://localhost:9000/insertcustomer",reOption)
        .then(res=>res.text())
        .then(data=>setMsg(data))
    }
    return(
        <div>
            <h1>New customer Registration</h1>
            <form>
                <label className="form-label">Enter FirstName : </label><span className="help-block">{customer.fname.error}</span>
                <input className="form-control-sm" type="text" name="fname" value={customer.fname.value}
                 onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}  />
               	<label className="form-label">Enter LastName :</label><span>{customer.lname.error}</span> 
              <input className="form-control-sm" type="text" name="lname" value={customer.lname.value} 
                onChange={(e)=>{handleChange("usid",e.target.value)}} onBlur={(e)=>{handleChange("usid",e.target.value)}}  /> 
                <label className="form-label">Enter Password : </label><span className="help-block">{customer.pwd.error}</span>
                <input className="form-control-sm" type="password" name="pwd" value={customer.pwd.value} 
                 onChange={(e)=>{handleChange("pwd",e.target.value)}} onBlur={(e)=>{handleChange("pwd",e.target.value)}}/>
               
                <label className="form-label">Re-Enter Password : </label><span className="help-block">{customer.rpwd.error}</span>
                <input className="form-control-sm" type="password" name="rpwd" value={customer.rpwd.value} 
                onChange={(e)=>{handleChange("rpwd",e.target.value,customer.pwd.value)}} onBlur={(e)=>{checkEqual("rpwd",e.target.value,customer.pwd.value)}}/>
               
               <label className="form-label">Enter Email-Id : </label><span className="help-block">{customer.mail.error}</span>
                <input className="form-control-sm" type="email" name="mail" value={customer.mail.value}
                 onChange={(e)=>{handleChange("mail",e.target.value)}} onBlur={(e)=>{handleChange("mail",e.target.value)}}/>
                
	       <label className="form-label">Enter Phone Number : </label><span className="help-block">{customer.phone.error}</span>
                <input className="form-control-sm" type="number" name="mail" value={customer.phone.value}
                 onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}}/>

		 <label className="form-label">Enter Address : </label><span className="help-block">{customer.add.error}</span>
                <input className="form-control-sm" type="text" name="add" value={customer.add.value}
                 onChange={(e)=>{handleChange("phone",e.target.value)}} onBlur={(e)=>{handleChange("phone",e.target.value)}}/>

                    <input  type="button" value="Register" onClick={(e)=>{submitData(e)}}/>
               
            </form>
            <h4>{msg}</h4>
        </div>
    )
}