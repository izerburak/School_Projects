import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles({
  root: {
    width: '240px',
    height: '110px',
    marginLeft: '1650px',
    marginTop: '13px',
    backgroundColor: '#5680e9' , 
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
    fontSize: 15,
    color: 'white',
    '&:hover': {
        color: 'red',
    }
  },
  title3: {
    fontSize: 15,
    color: 'white',
  },
  title2: {
    fontSize: 14,
    color: 'purple',
    '&:hover': {
        color: 'red',
    }
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <AccountBoxIcon></AccountBoxIcon>
        <a href="/updateprofile">{sessionStorage.getItem("username")}</a>
        </Typography>
        <Typography className={classes.title3} color="textSecondary" gutterBottom>
            Welcome, {sessionStorage.getItem("firstname")} {sessionStorage.getItem("lastname")}
        </Typography>
        <Typography  color="textSecondary" gutterBottom>
        <a href="/logout" className={classes.title2}>Logout</a>
        </Typography>
      </CardContent>
    </Card>
  );
}
