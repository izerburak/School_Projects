import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import OrderCard from "./OrderCard"


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class SalesManagerOrders extends React.Component {
    state = {
        orders:[],
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
    componentDidMount(){

        fetch('/sales_manager/order' , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(orders => {
              this.setState(()=>{
                  return{
                      orders:orders
                  }
              })
          });
    }

    render() {
    
        return(
          <div>
          <div className="products"> 
            {this.state.orders.map((order ) =>(
              <OrderCard order={order}></OrderCard>
            ))}
          </div>
        </div>)
    
    };
    }
    export default SalesManagerOrders;