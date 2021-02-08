import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import ValComment from './ValComment';
import Button from '@material-ui/core/Button';


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";

export class ProductManagerProducts extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(id) {

            fetch('/product_manager/comments/' + id , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
     window.location.reload();
        }
    
    state = {
        comments:[],
    }
    nextPath(path) {
        this.props.history.push(path);
      }

      componentWillMount()
    {
      if(!sessionStorage.getItem("userid"))
      {
          alert("You have to login to access this page!")
          this.nextPath('/login')
      }
      
      else if(!(sessionStorage.getItem("role")== "productmanager"))
      {
        alert("You are not authorized to see this page!")
        this.nextPath('/')
      }
    }
    componentDidMount(){
        fetch('/product_manager/comments' , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(comments => {
              console.log(comments)
              this.setState(()=>{
                  return{
                    comments:comments
                  }
              })
          });
    }

    


    render() {
    
        return(
          <div> 
          <div className="products"> 
            {this.state.comments.map((comment) =>(
                <ValComment comment={comment}></ValComment>
            ))}
          </div>
          <div className="pmanagerDiv">
          <Button variant="contained" color="primary"  onClick={() => this.nextPath('/') }>Go Back</Button>                    
          </div>   
        </div>)
    
    };
    }
    export default ProductManagerProducts;