import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard"



const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class ProductManagerDetails extends React.Component {
    constructor(props) {
        super(props);
      }
    state = {
        product:[],
        id:0,
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
      
      else if(!(sessionStorage.getItem("role") == "productmanager"))
      {
        alert("You are not authorized to see this page!")
        this.nextPath('/')
      }
    }
    componentDidMount(){

        this.state.id = this.props.match.params.productId

        fetch('/product_manager/product/' + this.state.id , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(product => {
              console.log(product)
              this.setState(()=>{
                  return{
                      product:product
                  }
              })
          });
    }

    render() {

        return(
          <> 
          <div className="products">
          <ProductDetailsCard product={this.state.product}></ProductDetailsCard>

                </div>
        </>)
    
    };
    }
    export default ProductManagerDetails ;
