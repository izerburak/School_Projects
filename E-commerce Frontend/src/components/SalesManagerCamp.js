import '../App.css';
import Loader from 'react-loader-spinner';
import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import SearchAppBar from "./Navbar"
import {NavSidebar} from "./NavSideBar"
import SalesManagerProdCard from "./SalesManagerProdCard"



const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";

export class SalesManagerCamp extends React.Component {
    state = {
        products:[],
        percentage: 10,
        isLoading: false,
    }
    componentDidMount(){
        fetch('/products/' , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(products => {
              console.log(products)
              this.setState(()=>{
                  return{
                      products:products
                  }
              })
          });
    }


 
nextPath(path) {
  this.props.history.push(path);
}

componentWillMount()
    {
        if(!sessionStorage.getItem("userid"))
        {
            alert("You have to login to access this page!")
            this.nextPath('/login')
        }
        
        else if(!(sessionStorage.getItem("role") == "salesmanager"))
        {
          alert("You are not authorized to see this page!")
          this.nextPath('/')
        }
    }

render() {

    if(this.state.isLoading)
    {
        return(<Loader 
            type="Puff"
            color="#00BFFF"
            height={500}
            width={1000}
            timeout={100000}/>)
    }

    else {
    
    return(
      <body>
        <> 
        <div className="products"> 
          {this.state.products.map((product) =>(
            <SalesManagerProdCard product={product}></SalesManagerProdCard>
          ))}
        </div>
      </>
    </body>)
    }

};
}
export default SalesManagerCamp;
