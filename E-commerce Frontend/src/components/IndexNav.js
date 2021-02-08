import '../App.css';
import Loader from 'react-loader-spinner';
import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import SearchAppBar from "./Navbar"
import {NavSidebar} from "./NavSideBar"
import SimpleCard from "./Card"


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";

export class IndexNav extends React.Component {
    state = {
      
    }
render() {
    
    if(!sessionStorage.getItem("username"))
    {
      return(
      <body>
        <div className="navbarClass">
          <SearchAppBar/>
        </div>
    </body>)
    }
    else {
    return(
      <body>
        <div className="navbarClass">
          <SearchAppBar/>
        </div>
        <div>
          <SimpleCard></SimpleCard>
          </div>


        
    </body>)
    }

};
}
export default IndexNav;
