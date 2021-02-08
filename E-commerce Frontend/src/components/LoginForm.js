import '../login.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';


function LoginForm({Login,error}) {

    const [details, setDetails] = useState({email:"", password:"",isLoading:false});
    const history = useHistory();
    if(sessionStorage.getItem("userid"))
    {
        alert("You are already logged in")
        history.push("/")
    }
    const submitHandler = e => {
        e.preventDefault();
        let email = details.email
        let password = details.password
        var obj = new Object()
        obj.emailOrUsername = email
        
        obj.password = password
        var jsonlogin = JSON.stringify(obj)
        console.log(jsonlogin)
        setDetails({...details, isLoading:"true"})
        fetch('/user/login' , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonlogin,
          }).then(response => {return response.json() }
          ).then(user => {
              console.log(user)
              if(user.message){
                
                  setDetails({...details, isLoading:"false"})
                  alert(user.message)
                  window.location.reload();
              }
              else{
                  sessionStorage.setItem("loginuserid",user.id)
                  sessionStorage.setItem("role",user.userRole)
                  sessionStorage.setItem("firstname",user.firstName)
                  sessionStorage.setItem("lastname",user.lastName)
                  sessionStorage.setItem("username",user.username)
                  sessionStorage.setItem("email",user.email)
                  setDetails({...details, isLoading:"false"})
                  history.push("/2fa")
              }
          });


        
    }

    if(details.isLoading)
    {
        return(<Loader 
            type="Puff"
            color="#00BFFF"
            height={800}
            width={1800}
            timeout={30000}/>)
    }

    else {
    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <div className = "loginNameClass">Welcome Back!
            <h3></h3>
            Please Login
            <h3></h3>
            </div>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group">
                <label htmlFor ="email">Email or Username</label>
                <input type = "text" name = "email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>

            <div className = "form-group"> 
                <label htmlFor = "password">Password:</label>
                <input type ="password" name = "password" id = "password" onChange ={e => setDetails({...details,password: e.target.value})} value ={details.password} />
            </div>

            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type="submit" value>Login</Button>
            </div>

            <div className = "form-group">
                <h2></h2>
                <label htmlFor ="label" >Not a member? <a href="/signup" className="hrefSign">Sign Up</a></label>       
            </div>

        </div>
   </form>
   </div>
)
}
}

export default LoginForm;
