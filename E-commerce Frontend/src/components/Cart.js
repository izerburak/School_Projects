
import '../App.css';
import Loader from 'react-loader-spinner';
import React, {useState} from 'react'
import CartProductCard from "./CartProductCard"
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import StoreIcon from '@material-ui/icons/Store';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const PAGE_PRODUCT = "products";
const PAGE_CART = "cart";

export class Cart extends React.Component {

    state = {
        products:[],
        quantity: 1
    }

    componentWillMount()
    {
      if(!sessionStorage.getItem("userid"))
      {
          alert("You have to login to access this page!")
          this.nextPath('/login')
      }
      
    }

    componentDidMount(){
        var cid = sessionStorage.getItem("userid")
        fetch('/cart/' + cid , {
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
    

        addProduct(pid,quantity1,productname) {

        var obj = new Object()
        obj.userId = sessionStorage.getItem("userid")
        obj.quantity = quantity1
        var jsonobj = JSON.stringify(obj)

        fetch('/cart/' + pid , {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsonobj,
        }).then(response => {return response.json() }
        ).then(user => {
            if(user.message){
            
                alert(user.message)
            }
            else{
            
            this.getCart()
            }
        });
    }
        deleteProduct(pid,quantity1,productname) {

        var obj = new Object()
        obj.userId = sessionStorage.getItem("userid")
        obj.quantity = quantity1
        var jsonobj = JSON.stringify(obj)

        fetch('/cart/' + pid , {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: jsonobj,
    }).then(response => {return response.json() }
    ).then(user => {
        if(user.message){
            
            alert(user.message)
        }
        else{
            
            this.getCart()
        }
        });
        }
  
  



/*const addToCart = (product) =>{
    setCart([...cart, {...product}]);
};
const removeFromCart = (productToRemove) =>{
  setCart(cart.filter(product => product !== productToRemove ));
}

const navigateTo = (nextPage) => {
  setPage(nextPage);
}

*/
getCart(){
    var cid = sessionStorage.getItem("userid")
        fetch('/cart/' + cid , {
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
clearCart() {
    var jsonobj = new Object()

    var cid = sessionStorage.getItem("userid")
    jsonobj.userId=cid
    var yok = JSON.stringify(jsonobj)
    fetch('/cart/' , {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: yok
      }).then(response => {return response.json() }
      ).then(products => {
          console.log(products)
          this.setState(()=>{
              return{
                  products:[]
              }
          })
      });
}
nextPath(path) {
    this.props.history.push(path);
  }

render() {
    
    return(
        <> 
        <div className="products"> 
          {this.state.products.map((product) =>(
            <CartProductCard product={product}></CartProductCard>
          ))}
        
        </div>
        <div className="cartDiv">
          
        
        <Button variant="contained" color="primary" onClick={()=>this.nextPath("/payment")}><MonetizationOnIcon></MonetizationOnIcon>Checkout</Button>
        <Button variant="contained" color="primary" onClick={()=>this.nextPath("/")}><StoreIcon></StoreIcon> Continue Shopping</Button>
        <Button variant="contained" color="primary" onClick={()=>this.clearCart()}> <RemoveShoppingCartIcon></RemoveShoppingCartIcon> Remove All Products </Button>
        </div>
       
      </>)

};
}
export default Cart;
/*
const renderCart = ()=>(
  <> 
      <h1>Cart</h1>
      <button onClick={()=>clearCart()}> Remove All Products </button>
      <div className="products"> 
        {cart.map((product, idx) =>(
          <div className="product-inner" key={idx}>
            <h3>{product.name}</h3>
            <h4>${product.cost}</h4>
            <img src={product.image}/>
            <br/>
            <button onClick={()=>removeFromCart(product)}> Remove </button>
          </div> 
        ))}
      </div>
    </>
);

  return (

    <div className="App"> 
      <header>
        <button onClick={()=>navigateTo(PAGE_PRODUCT)}> Products </button>
        <button onClick={()=>navigateTo(PAGE_CART)}>Cart ({cart.length})</button>  
      </header>
      
      {page === PAGE_PRODUCT && renderProducts()}
      {page === PAGE_CART && renderCart()}
      
    </div>
  );
}
*/
