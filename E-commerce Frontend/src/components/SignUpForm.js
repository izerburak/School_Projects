import '../login.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function SignUpForm({Login,error}) {
    
    
    const history = useHistory();
    const [details, setDetails] = useState({customerName:"", customerSurname: "", userName:"", email:"", password:""});
    //const [user, setUser] = useState({customerName:"",customerSurname:"",userName:"", email:"", password:""});
    const submitHandler = e => {
        e.preventDefault();
        let name = details.customerName
        let surname = details.customerSurname
        let username = details.userName
        let email = details.email
        let password = details.password
        var obj = new Object()
        obj.firstName = name
        obj.lastName = surname
        obj.username = username
        obj.email = email
        obj.password = password
        var jsonsignup = JSON.stringify(obj)
        console.log(jsonsignup)
        //fetch('api/groups')
        //.then(response => response.json())
        //.then(data => this.setState({groups: data, isLoading: false}));
        fetch('/user/signup' , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonsignup,
          }).then(response => {return response.json() }
          ).then(user => {
              console.log(user)
              if(user.message){
                  alert(user.message)
              }
              else{
                  history.push("/login")
              }
          });
          
        //Login(details)
    }
    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
        <div className = "signUpNameClass">Welcome To e Commerce!
            <h3></h3>
            Sign-Up
            <h3></h3>
            </div>         
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group">
                <label htmlFor ="customerName">Name</label>
                <input type = "text" name = "customerName" id="customerName" onChange={e => setDetails({...details, customerName: e.target.value})} value={details.customerName}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="customerSurname">Surname</label>
                <input type = "text" name = "customerSurname" id="customerSurname" onChange={e => setDetails({...details, customerSurname: e.target.value})} value={details.customerSurname}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="userName">User Name</label>
                <input type = "text" name = "userName" id="userName" onChange={e => setDetails({...details, userName: e.target.value})} value={details.userName}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="email">Email</label>
                <input type = "email" name = "email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>

            <div className = "form-group"> 
                <label htmlFor = "password">Password</label>
                <input type ="password" name = "password" id = "password" onChange ={e => setDetails({...details,password: e.target.value})} value ={details.password} />
            </div>

            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" >Sign Up</Button>

            </div>
        </div>
    </form>
   </div>
)
}

export default SignUpForm
