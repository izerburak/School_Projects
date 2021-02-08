import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';



function handleClick(pid,quantity1,productname) {

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
        alert(quantity1 + " " + productname +" is successfully added to your cart.")
      }
  });
}

const useStyles = makeStyles({
  root: {
    width: 340,
    border:'1px solid indigo',
  },
  media: {
    height: 140,
    width: 200,
    position: 'relative',
    right: '140px',
    objectFit:'cover',
  },
});



export default function ProductCard(product) {
  const classes = useStyles();
  console.log(product.product);
  const history = useHistory();


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component = "img"
          className={classes.media}
          image={product.product.productImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.product.productName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.product.productPrice} TL
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={()=>history.push("/product/" + product.product.id)} color="primary">
          <ReceiptIcon></ReceiptIcon>
          Details
        </Button>
        <Button size="small" onClick={()=>handleClick(product.product.id, 1, product.product.productName)} color="primary">
          <ShoppingCartIcon></ShoppingCartIcon>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
