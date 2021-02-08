import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import ProdManagerCard from "./ProdManagerCard"
import Button from '@material-ui/core/Button';
import ProductDetailsCard from "./ProductDetailsCard"



const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class ProductManagerProducts extends React.Component {
    state = {
        products:[],
    }
    nextPath(path) {
        this.props.history.push(path);
      }

      handleClick(id) {

        fetch('/product_manager/product/' + id , {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {return response.json() }
      ).then(tags => {
          if(tags.message)
          {
            alert(tags.message)
          }
      });
      window.location.reload();
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
    
    componentDidMount(){
        fetch('/product_manager/product' , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(products => {
              console.log(products)
              this.setState(()=>{
                  return{
                      products:products
                  }
              })
          });
    }

    render() {
    
        return(
          <div> 
          <div className="products"> 
            {this.state.products.map((product ) =>(
              <ProdManagerCard product={product}></ProdManagerCard>
            ))}
          </div>
          <div className="pmanagerDiv">
          <Button variant="contained" color="primary"  onClick={() => this.nextPath('/productmanager/addproduct') }>Add Product</Button>
          <Button variant="contained" color="primary"  onClick={() => this.nextPath('/') }>Go Back</Button>          
          </div>
        </div>)
    
    };
    }
    export default ProductManagerProducts;