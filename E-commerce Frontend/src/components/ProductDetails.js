import '../App.css';
import React, {useState} from 'react'
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import {useParams} from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard"
import CommentCard from "./CommentCard"


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";


export class ProductManagerDetails extends React.Component {
    constructor(props) {
        super(props);
      }
    state = {
        product:[],
        id:0,
        comments:[],
        tags:[],
    }
    nextPath(path) {
        this.props.history.push(path);
      }

    componentDidMount(){

        this.state.id = this.props.match.params.productId

        fetch('/product_manager/product/' + this.state.id , {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(product => {
              console.log(product)
              this.setState(()=>{
                  return{
                      product:product
                  }
              })
          });

          fetch('/products/' + this.state.id + '/comments', {
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


          fetch('/products/'+ 'get_taglist/' + this.state.id, {
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
              console.log(tags)
              this.setState(()=>{
                
                  return{
                      tags:tags
                  }
              })
          });
    }

    

    
    render() {
      let toParent = {"product":this.state.product,"tags":this.state.tags}
      console.log(toParent)
      console.log(this.state.product)
        return(
          <> 
          <div className="products">
                <ProductDetailsCard product={toParent} ></ProductDetailsCard>
                </div>
                <CommentCard comments={this.state.comments}></CommentCard>
        </>)
    
    };
    }
    export default ProductManagerDetails ;
