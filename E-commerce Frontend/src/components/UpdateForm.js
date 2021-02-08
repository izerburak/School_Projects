import '../login.css';
import '../App.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';

function UpdateForm({Login,error}) {

    const [details, setDetails] = useState({customerName:"", customerSurname: "", userName:"", email:""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        let email = details.email
        let username = details.userName
        let firstName = details.customerName
        let lastName = details.customerSurname
        var obj = new Object()
        obj.email = email
        obj.username = username
        obj.firstName = firstName
        obj.lastName = lastName
        obj.userId = sessionStorage.getItem("userid")
        sessionStorage.setItem("email",email)
        var jsonlogin = JSON.stringify(obj)
        console.log(jsonlogin)
        setDetails({...details, isLoading:"true"})
        fetch('/user/updateuser' , {
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
                  sessionStorage.setItem("firstname",user.firstName)
                  sessionStorage.setItem("lastname",user.lastName)
                  sessionStorage.setItem("username",user.username)
                  sessionStorage.setItem("email",user.email)
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
                <label htmlFor ="customerName">Name</label>
                <input type = "text" name = "customerName" id="customerName" placeholder={sessionStorage.getItem("firstname")} onChange={e => setDetails({...details, customerName: e.target.value})} value={details.customerName}/>
            </div>

            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="customerSurname">Surname</label>
                <input type = "text" name = "customerSurname" id="customerSurname" placeholder={sessionStorage.getItem("lastname")} onChange={e => setDetails({...details, customerSurname: e.target.value})} value={details.customerSurname}/>
            </div>

            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="userName">User Name</label>
                <input type = "text" name = "userName" id="userName" placeholder={sessionStorage.getItem("username")} onChange={e => setDetails({...details, userName: e.target.value})} value={details.userName}/>
            </div>

            <div className = "form-group updateprofile-form-group">
                <label htmlFor ="email">Email</label>
                <input type = "email" name = "email" id="email" placeholder={sessionStorage.getItem("email")} onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>

            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" value>Update Information</Button>
                </div>
            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" onClick={()=>history.push("/passwordchange")}>Change Password</Button>
            </div>
        </div>
        
   </form>
   </div>
)
}

export default UpdateForm;