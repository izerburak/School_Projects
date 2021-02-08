import '../login.css';
import '../App.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function AddTag({AddTag,error}) {

    const [details, setDetails] = useState({name:""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        let name = details.name
        var obj = new Object()
        obj.tagName = name
        var jsonlogin = JSON.stringify(obj)
        console.log(jsonlogin)
        fetch('/product_manager/tags' , {
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
          ).then(product => {
              console.log(product)
              if(product.message){
                
                  alert(product.message)
              }
              else{
                  history.push("/productmanager/tags")
              }
          });


        
    }

    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
        <div className = "loginNameClass"> <h3>Add A New Tag</h3> </div>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group">
                <label htmlFor ="name">Tag Name:</label>
                <input type = "text" name = "name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>

            <div className="buttonPos">
                <Button variant="contained" color="secondary" size="large" type = "submit" value>Add Tag</Button>
            </div>
        </div>
   </form>
   </div>
)
}

export default AddTag;
