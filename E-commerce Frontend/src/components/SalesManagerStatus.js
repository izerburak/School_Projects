import '../Admin.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';

export class SalesManagerStatus extends React.Component {

    constructor(props){
        super(props);
        this.setOrderId = this.setOrderId.bind(this);
      }

    state = {
        orderId: 0,
        address: "",
        status: "",
        newAddress: "",
        newOrderStatus: "",
    }

    setOrderId(evt){
        this.setState({
            orderId: evt.target.value
          });
    }

    setOrderAddress(evt){
        this.setState({
            newAddress: evt.target.value
          });
    }

    setOrderStatus(evt){
        this.setState({
            newOrderStatus: evt.target.value
          });
    }

    handleClick(id) {

        fetch('/sales_manager/order/' + id , {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {return response.json() }
      ).then(order => {
        this.setState({ 
            address: order.orderAddress,
            status: order.orderStatus
        });

      });
    }

    handleClickAddress(id) {
        
        var obj = new Object();
        obj.address = this.state.newAddress;
        var json = JSON.stringify(obj);
        alert("Address Of Order " + id + " successfully changed to " + this.state.newAddress)

        fetch('/sales_manager/order/' + id , {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json,
      }).then(response => {return response.json() }
      ).then(order => {
        this.setState({ 
            address: order.orderAddress
        });
      });
      window.location.reload();

    }

    handleClickStatus(id) {

        var obj = new Object();
        obj.status = this.state.newOrderStatus;
        var json = JSON.stringify(obj);
        alert("Status Of Order " + id + " successfully changed to " + this.state.newOrderStatus)

        fetch('/sales_manager/order/' + id , {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json,
      }).then(response => {return response.json() }
      ).then(order => {
        this.setState({ 
            status: order.orderStatus
        });
      });
      window.location.reload();
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
    
        return(
          <div> 
            <h1 className="admin-head">Change Order Address/Status</h1>
            <div className = "statusContainer">
              <br></br>
              <br></br>
              <br></br>
                <h3>
                   Order Id: <input className= "admin-box" type="number" onChange ={evt => this.setOrderId(evt)} ref={this.state.orderId}></input> 
                  <button className="admin-small-button" onClick={() => this.handleClick(this.state.orderId)}>Select Order</button>
                  <br></br>
                  <br></br> 
                   Order Address: {this.state.address} <br></br> <br></br> Order Status: {this.state.status} 
                </h3>
              <br></br>
              <div>
                <h3>Selected Order: {this.state.orderId}</h3>
                <br></br>  
                  <h3> New Order Address: <input className= "admin-box-long" type="text" onChange ={evt => this.setOrderAddress(evt)} ref={this.state.newAddress}></input> 
                  <button className="admin-small-button" onClick={() => this.handleClickAddress(this.state.orderId)}>Change Address</button>
                  </h3>
                  <br></br>
                    <h3> New Order Status  :         <input className= "admin-box-long" type="text" onChange ={evt => this.setOrderStatus(evt)} ref={this.state.newOrderStatus}></input> 
                    <button className="admin-small-button" onClick={() => this.handleClickStatus(this.state.orderId)}>Change Order Status</button>
                  </h3>
              </div>
            </div>
        </div>)
    
    };
    }
    export default SalesManagerStatus;