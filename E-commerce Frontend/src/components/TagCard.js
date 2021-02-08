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





function handleClick(tagname) {

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



export default function TagCard(tag) {
  const classes = useStyles();
  console.log(tag.tag);
  const history = useHistory();


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tag.tag.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={()=>handleClick(tag.tag.name)} color="primary">
          <RemoveIcon></RemoveIcon>
          Remove Tag
        </Button>
      </CardActions>
    </Card>
  );
}
