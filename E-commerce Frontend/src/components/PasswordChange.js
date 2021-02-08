import '../login.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';

function PasswordChange({Login,error}) {

    const [details, setDetails] = useState({currentpassword:"", newpassword:"", retypepassword:""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        var obj = new Object()
        obj.currentPassword = details.currentpassword
        obj.newPassword = details.newpassword
        obj.reTypePassword = details.retypepassword
        obj.userId = sessionStorage.getItem("userid")
        
        var jsonlogin = JSON.stringify(obj)
        console.log(jsonlogin)
        setDetails({...details, isLoading:"true"})
        fetch('/user/updateuser/updatepassword' , {
            method: 'PUT',
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
                  alert("Your password has successfully changed!")
                 
                  setDetails({...details, isLoading:"false"})
                  history.push("/")
              }
          });


        
    }
    return (
        <div className="App">
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
        <div className = "loginNameClass"> Please enter your new information to update your Account </div>
        <h3></h3>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="currentPassword">Current Password</label>
                <input type = "password" name = "password" id="password" onChange={e => setDetails({...details, currentpassword: e.target.value})} value={details.currentpassword}/>
            </div>

            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="newpassword">New Password</label>
                <input type = "password" name = "password" id="password" onChange={e => setDetails({...details, newpassword: e.target.value})} value={details.newpassword}/>
            </div>

            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="retypepassword">Confirm New Password</label>
                <input type = "password" name = "password" id="password" onChange={e => setDetails({...details, retypepassword: e.target.value})} value={details.retypepassword}/>
            </div>


            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" value>Update Password</Button>  
            </div>
            
        </div>
   </form>
   </div>
)
}

export default PasswordChange;