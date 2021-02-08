import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




const useStyles = makeStyles({
  root: {
    width: '240px',
    height: '620px',
    marginLeft: '1650px',
    marginTop: '150px',
    backgroundColor: 'white' , 
    border:'1px solid indigo',
    marginBottom: '-120px',
    position: 'absolute',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  title3: {
    fontSize: 15,
    color: 'black',
  },
  title2: {
    fontSize: 14,
    color: 'purple',
    '&:hover': {
        color: 'red',
    }
  },

  inputClass: {
    fontSize: 15,
    backgroundColor: 'white',
    width: '110px',
    position: 'absolute',
    left: '100px',
    color: 'black',
  },
  pos: {
    marginBottom: 12,
  },

  menuButton: {
    width: '98%',
    backgroundColor: 'purple',
    color: 'white',
  },
  hr: {
      color: 'black',
      backgroundColor: 'black'
  },
  comment: {
      wordWrap: 'break-word'
},
   smalltext: {
       fontSize: 14,
       marginTop: 10,
       marginLeft: 13,
   }
});

export default function CommentCard(comments) {
    const classes = useStyles();
    console.log(comments.comments)
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Comments
        <Divider></Divider>
        </Typography> 
        <List>
            { comments.comments.map((comment) => (
            <ListItem>
               <ListItemText className={classes.comment}> <h4><b>{comment.user.username}:</b></h4> <h6 className={classes.smalltext}>{comment.commentText}</h6> </ListItemText>
            </ListItem>     
            ))
            }   
            
        </List>
        
      </CardContent>
    </Card>
  );
}
