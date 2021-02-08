import '../login.css';
import '../App.css';
import React, {useState} from 'react';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function AddProduct({AddProduct,error}) {

    const [details, setDetails] = useState({name:"", description:"", price:0, image:""});
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        let name = details.name
        let description = details.description
        let price = details.price
        var obj = new Object()
        obj.productName = name
        obj.productDescription = description
        obj.productPrice = price
        obj.productImage = details.image;
        var jsonlogin = JSON.stringify(obj)
        console.log(jsonlogin)
        fetch('/product_manager/product' , {
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
                  history.push("/productmanager/products")
              }
          });


        
    }

    return (
        <div className="App">  
   <form onSubmit = {submitHandler}>
        <div className = "form-inner">
        <div className = "loginNameClass"><h3>Add Product</h3>
        </div>
    {(error != "") ? (<div className= "error">{error}</div>) :""}
            <div className = "form-group">
                <label htmlFor ="productName">Product Name:</label>
                <input type = "text" name = "productName" id="productName" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="productDescription">Product Description:</label>
                <input type = "text" name = "productDescription" id="productDescription" onChange={e => setDetails({...details, description: e.target.value})} value={details.description}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="productPrice">Product Price:</label>
                <input type = "number" step="0.1" name = "productPrice" id="productPrice" onChange={e => setDetails({...details, price: e.target.value})} value={details.price}/>
            </div>

            <div className = "form-group">
                <label htmlFor ="productDescription">Product Image</label>
                <input type = "text" name = "productImage" id="productImage" onChange={e => setDetails({...details, image: e.target.value})} value={details.image}/>
            </div>


            <div className="submitButton">
                <Button variant="contained" color="secondary" size="large" type = "submit" value>Add Product</Button>
            </div>
        </div>
   </form>
   </div>
)
}

export default AddProduct;
