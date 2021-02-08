import React, {useState} from "react";
import SignUpForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm"
import TwoFactorAuth from "./components/TwoFactorAuth"
import Payment from "./components/Payment"
import OrderList from "./components/OrderList"
import Index from "./components/Index"
import Campaigns from "./components/Campaigns"
import Invoice from "./components/Invoice"
import ProductManager from "./components/ProductManager";
import ProductDetails from "./components/ProductDetails";
import ProductManagerProducts from "./components/ProductManagerProducts";
import ProductManagerTags from "./components/ProductManagerTags";
import ProductManagerComments from "./components/ProductManagerComments";
import ProductManagerDetails from "./components/ProductManagerDetails";
import SalesManager from "./components/SalesManager";
import SalesManagerOrders from "./components/SalesManagerOrders";
import SalesManagerStatus from "./components/SalesManagerStatus";
import SalesManagerCamp from "./components/SalesManagerCamp";
import SalesManagerInvoice from "./components/SalesManagerInvoice";
import VerificationPage from "./components/VerificationPage"
import Cart from "./components/Cart"
import IndexNav from "./components/IndexNav"
import UpdateForm from "./components/UpdateForm"
import PasswordChange from "./components/PasswordChange"
import Logout from "./components/Logout"
import NavSideBar from "./components/NavSideBar"


import AddProduct from "./components/AddProduct";
import AddTag from "./components/AddTag";

import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState({customerName:"",customerSurname:"",userName:"", email:"", password:""});
  const [error, setError] = useState("");

  const Login = details =>{
    setUser({name:details.name, email: details.email});
    console.log(details);
  }
  
  
  return (
    <Router>

        <Route path="/" component={IndexNav} />
        <Route exact path="/logout" component={Logout} />
      
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/2fa" component={TwoFactorAuth} />

        <Route exact path="/payment" component={Payment} />
        <Route exact path="/orders" component={OrderList}/>
        <Route path = "/order/invoice/:id" component={Invoice}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/updateprofile" component={UpdateForm}/>
        <Route exact path="/passwordchange" component={PasswordChange}/>
        <Route exact path="/campaigns" component={Campaigns}/>
        <Route path = "/product/:productId" component={ProductDetails}/>

        <Route path="/productmanager" component={ProductManager} />
        <Route exact path="/productmanager/products" component={ProductManagerProducts} />
        <Route exact path="/productmanager/addProduct" component={AddProduct} />
        <Route path="/productmanager/products/:productId" component={ProductManagerDetails}/>

        <Route path="/salesmanager" component={SalesManager} />
        <Route exact path="/salesmanager/orders" component={SalesManagerOrders} />
        <Route path = "/salesmanager/orders/:id" component={SalesManagerInvoice} />
        <Route exact path="/salesmanager/status" component={SalesManagerStatus} />
        <Route exact path="/salesmanager/campaigns" component={SalesManagerCamp} />

        <Route path="/user/verification/:verificationnumber" component={VerificationPage}/>
        
        <Route exact path="/productmanager/tags" component={ProductManagerTags}/>
        <Route exact path="/productmanager/tags/addTag" component={AddTag}/>

        <Route exact path="/productmanager/comments" component={ProductManagerComments}/>



        <Route exact path="/" component={Index} />


    </Router>
      );
}

export default App;