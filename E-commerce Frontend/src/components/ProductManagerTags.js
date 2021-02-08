import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import ProductDetailsCard from "./ProductDetailsCard"
import TagCard from './TagCard';
import Button from '@material-ui/core/Button';


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class ProductManagerProducts extends React.Component {
    state = {
        tags:[],
    }
    nextPath(path) {
        this.props.history.push(path);
      }

      handleClick(tagname) {

        var obj = new Object
        obj.tagName = tagname
        var jsontag = JSON.stringify(obj)


        fetch('/product_manager/tags' , {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: jsontag,
      }).then(response => {return response.json() }
      ).then(tags => {
          if(tags.message)
          {
            alert(tags.message)
          }
          window.location.reload();
      });
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
        fetch('/product_manager/tags' , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(tags => {
              
              this.setState(()=>{
                  return{
                      tags:tags
                  }
              })
          });
    }


    render() {
    
        return(
          <div> 
          <div className="products"> 
            {this.state.tags.map((tag ) =>(
               <TagCard tag={tag}></TagCard>
            ))}
          </div>
          <div className="pmanagerDiv">
          <Button variant="contained" color="primary"  onClick={() => this.nextPath('/productmanager/tags/addtag') }>Add Tag</Button>
          <Button variant="contained" color="primary"  onClick={() => this.nextPath('/') }>Go Back</Button>                    
          </div>
        </div>)
    
    };
    }
    export default ProductManagerProducts;