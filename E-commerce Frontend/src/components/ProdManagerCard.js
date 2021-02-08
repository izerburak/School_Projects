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
import Input from '@material-ui/core/Input';
import PostAddIcon from '@material-ui/icons/PostAdd';


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


function addTag(pid,tagname) {

  var obj = new Object()
  obj.tagName = tagname
  var jsonobj = JSON.stringify(obj)

  fetch('/product_manager/product/' + pid, {
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
      alert("Tag added!")

    }
});

window.location.reload();



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
  },
});



export default function ProductCard(product) {
  const classes = useStyles();
  console.log(product.product);
  const history = useHistory();
  const [tag, setTag] = React.useState("");

  const handleChange1 = (event) => {
    setTag(event.target.value);
  };


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component = "img"
          className={classes.media}
          image={product.product.productImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.product.productName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {product.product.productPrice} TL
          </Typography>
          <br></br>
          <Typography gutterBottom variant="body2" component="p">
            Tag : <Input placeholder="" type="text" value={tag} onChange={handleChange1}></Input>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={()=>history.push("/product/" + product.product.id)} color="primary">
          <ReceiptIcon></ReceiptIcon>
          Details
        </Button>
        <Button size="small" onClick={() => addTag(product.product.id, tag)} color="primary">
          <PostAddIcon></PostAddIcon>
          Add Tag
        </Button>
      </CardActions>
    </Card>
  );
}
