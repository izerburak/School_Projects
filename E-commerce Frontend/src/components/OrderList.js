import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import OrderCard from "./OrderCard"


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class OrderList extends React.Component {
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
          alert("You have to login in order to see your orders.")
          this.nextPath('/login')
      }  
    }
    componentDidMount(){
        var obj = new Object();
        obj.userId = sessionStorage.getItem("userid");
        var jsonobj = JSON.stringify(obj);
        fetch('/invoice/userOrderHistory' , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonobj,
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
          <> 
          <div className="products"> 
            {this.state.orders.map((order) =>(
               <OrderCard order={order}></OrderCard>
            ))}
          </div>
        </>)
    
    };
    }
    export default OrderList;