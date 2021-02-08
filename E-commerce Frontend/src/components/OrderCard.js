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
    height: 200,
    width: 290,
    position: 'relative',
    right: '180px',
    bottom: '24px',
  },
});



export default function OrderCard(order) {
  const classes = useStyles();
  console.log(order.order);
  const history = useHistory();


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component = "img"
          className={classes.media}
          image="https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/01/1b/e1/011be139-2c4e-fa16-9a4e-5d0f8f9d17a1/source/200x200bb.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Order #{order.order.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {order.order.orderAddress}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {order.order.orderStatus}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={()=>history.push("/order/invoice/" + order.order.id)} color="primary">
          <ReceiptIcon></ReceiptIcon>
          Invoice
        </Button>
      </CardActions>
    </Card>
  );
}
