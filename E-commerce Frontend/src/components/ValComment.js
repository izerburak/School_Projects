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
import RemoveIcon from '@material-ui/icons/Remove';
import DoneAllIcon from '@material-ui/icons/DoneAll';




function handleClick(id) {

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



export default function ValComment(comment) {
  const classes = useStyles();
  console.log(comment.comment);
  const history = useHistory();


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            User: {comment.comment.user.username}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Product: {comment.comment.product.productName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Comment: {comment.comment.commentText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={()=>handleClick(comment.comment.id)} color="primary">
          <DoneAllIcon></DoneAllIcon>
          Validate Comment
        </Button>
      </CardActions>
    </Card>
  );
}
