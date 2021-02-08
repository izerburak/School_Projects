import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom";



const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class ProductManagerDetails extends React.Component {
    constructor(props) {
        super(props);
      }
    state = {
        invoice:[],
        id:0,
    }
    nextPath(path) {
        this.props.history.push(path);
      }

    componentDidMount(){

        this.state.id = this.props.match.params.id

        var obj = new Object();
        obj.userId = sessionStorage.getItem("userid");
        var jsonobj = JSON.stringify(obj);

        console.log(this.state.id)
        fetch('/sales_manager/order/' + this.state.id + '/invoice', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(invoice => {
              console.log(invoice)
              this.setState(()=>{
                  return{
                    invoice:invoice
                  }
              })
          });
    }

    render() {

        return(
          <> 
          <div className="products">
            <div className="product-inner">
                <h3>{this.state.invoice.name}</h3>
                <h3>{this.state.invoice.surname}</h3>
                <h3>{this.state.invoice.totalAmount}</h3>
                </div>
                </div>
        </>)
    
    };
    }
    export default ProductManagerDetails ;
