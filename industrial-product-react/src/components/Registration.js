/*import React from "react";
const Registration=()=>{
return <div>Registration</div>;
};
export default Registration;
*/




//  Using Switch

/*
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BuyerRegistration from "./BuyerRegistration";
import SellerRegistration from "./SellerRegistration";

const RegistrationPage = () => {
    return (
        <Router>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">Registration</h1>
                        <Switch>
                            <Route exact path="/registration/buyer" component={BuyerRegistration} />
                            <Route exact path="/registration/seller" component={SellerRegistration} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default RegistrationPage;
*/


//    Without Using Switch  ..

/*
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BuyerRegistration from "./BuyerRegistration"; // Adjust the path accordingly
import SellerRegistration from "./SellerRegistration"; // Adjust the path accordingly

const RegistrationPage = () => {
    return (

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">Registration</h1>
                        <Route path="/registration/buyer" component={BuyerRegistration} />
                        <Route path="/registration/seller" component={SellerRegistration} />
                    </div>
                </div>
            </div>

    );
};

export default RegistrationPage;
*/


import seller from "../images/seller.jpg";
import buyer  from "../images/buyer.jpg";
import React from 'react';
import { NavLink } from 'react-router-dom';

const Registration = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <img src={seller} alt="Buyer Logo" style={{ paddingTop:"50px", maxWidth: "200px", borderRadius: "10px " }} />
                        <NavLink to="/Register" className="btn btn-primary btn-md mt-3">Register as Buyer</NavLink>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <img src={buyer} alt="Seller Logo"  style={{paddingTop:"50px", maxWidth: "200px", borderRadius: "10px "  }}/>
                        <NavLink to="/Seller" className="btn btn-primary btn-md mt-3">Register as Seller</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;


