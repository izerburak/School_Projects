import '../login.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import NavSidebar from './NavSideBar';





export class ProductManager extends React.Component {

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

    render() {
    
        return(
          <div className="navSidebarClass">    
             <NavSidebar></NavSidebar>
          </div>)
    
    };
    }
    export default ProductManager;