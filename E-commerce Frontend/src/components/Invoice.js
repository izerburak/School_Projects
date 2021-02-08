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
        invoiceStr:[],
        elements:[],
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
                    invoice:invoice,
                  }
              })
          });
          console.log(this.state.invoice);


          fetch('/invoice/get_invoice/' + this.state.id, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.text() }
          ).then(invoiceStr => {
              console.log(invoiceStr)
              this.setState(()=>{
                return{
                  invoiceStr:invoiceStr,
                }
            })
          });

    }

    render() {
      console.log(typeof this.state.invoice.cartP_productsList);

        return(
          <> 
          <div className="invoiceString">
            <div>
                <h3>Order #{this.state.id}</h3>
                <h3>------------------------------------------------</h3>
                <h6 className="invoiceStructured">{this.state.invoiceStr}</h6>
                <h3>Total: {this.state.invoice.totalAmount} TL</h3>
                <h3>------------------------------------------------</h3>
                <h3>{this.state.invoice.name} {this.state.invoice.surname} </h3>
                <h3>{this.state.invoice.address}</h3>
                </div>
                </div>
        </>)
    
    };
    }
    export default ProductManagerDetails ;
