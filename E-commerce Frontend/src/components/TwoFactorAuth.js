import '../login.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function TwoFactorAuth({Login,error}) {

    const [details, setDetails] = useState({authcode:""});
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        let authcode = details.authcode
        var obj = new Object()
        obj.code = authcode

        var userId = sessionStorage.getItem("loginuserid")
        obj.userId = userId
        var jsonlogin = JSON.stringify(obj)  
        console.log(jsonlogin)    
        fetch('/user/2fa' , {
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
                
                  alert(user.message)
              }
              else{
                  sessionStorage.setItem("userid",userId)
                  alert("Authentication Successful!")
                  history.push("/")
                  
              }
          });

        
    }
    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
        <div className = "loginNameClass"> Please enter the Authenticator Code sent to your email </div>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group fa-form-group">
                <label htmlFor ="">Authenticator Code</label>
                <input type = "authcode" name = "authcode" id="authcode" onChange={e => setDetails({...details, authcode: e.target.value})} value={details.authcode}/>
            </div>

            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large"  type = "submit" value><LockOpenIcon></LockOpenIcon>Authorize</Button>
            </div>
        </div>
   </form>
   </div>
)
}

export default TwoFactorAuth;
