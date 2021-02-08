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



function handleClick(pid,percentage,productname) {

    var obj = new Object()
    obj.productID = pid
    obj.percentage = percentage
    var jsonobj = JSON.stringify(obj)

    fetch('/sales_manager/campaign' , {
    method: 'PUT',
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
        alert(percentage +" percent is applied to " + productname)
      }
  });

    window.location.reload();
}

function endCampaign(pid,productname) {


  fetch('/sales_manager/campaign/' + pid, {
  method: 'DELETE',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then(response => {return response.json() }
).then(user => {
    if(user.message){        
        alert(user.message)

    }
    else{
      alert("Campaign has ended on " + productname)

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
  const [percentage, setPercentage] = React.useState(0);
  var rating = product.product.avgRating;

  const handleChange1 = (event) => {
    setPercentage(event.target.value);
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
            Percentage : <Input placeholder="0" type="number" value={percentage} onChange={handleChange1}></Input>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" onClick={() => handleClick(product.product.id, percentage, product.product.productName)} color="primary">
          <ReceiptIcon></ReceiptIcon>
          Create Campaign
        </Button>
        <Button size="small" onClick={() => endCampaign(product.product.id, product.product.productName)} color="primary">
          <ReceiptIcon></ReceiptIcon>
          End Campaign
        </Button>
        <br></br>

      </CardActions>
    </Card>
  );
}
