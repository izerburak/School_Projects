
import '../App.css';
import Loader from 'react-loader-spinner';
import React, {useState} from 'react'



export class Logout extends React.Component {


    nextPath(path) {
        this.props.history.push(path);
      }

    componentDidMount(){
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("firstname")
        sessionStorage.removeItem("lastname")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("email",)
        sessionStorage.removeItem("loginuserid")
        sessionStorage.removeItem("userid")
        this.nextPath("/");

    }
   

render() {
    
    return(
        <> 
        <h1>You have been logged out!</h1>
      </>)

};
}
export default Logout;
