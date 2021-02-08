import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText } from "@material-ui/core"
import { Redirect, withRouter,useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StarIcon from '@material-ui/icons/Star';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';



import '../NavSidebar.css';


const navLinks = [
  { title: `home`, path: `/` },
  { title: `orders`, path: `/orders` },
  { title: `cart`, path: `/cart` },
  { title: `login`, path: `/login` },
  { title: `sign up`, path: `/signup` },
]


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5680e9',
  },

  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    marginTop:'-6%',
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.20),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop:'-1.98%',
  },
  title: {
    marginTop:'-1.98%',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    marginTop:'-1%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.40),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.60),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();

  if(!sessionStorage.getItem("userid"))
  {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          
          <Toolbar>
          <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <HomeIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Pep-E Commerce
            </Typography>
             <List 
             component="nav"
             aria-labelledby="main navigation"
             className={classes.navDisplayFlex}>
              <a href={`/`} key={'home'} className={classes.linkText}>
                <ListItem button>
                  <HomeIcon/>
                  <ListItemText primary={'home'} />
                </ListItem>
               </a>
               <a href={`/campaigns`} key={'special offers'} className={classes.linkText}>
                <ListItem button>
                  <StarIcon/>
                  <ListItemText primary={'special offers'} />
                </ListItem>
               </a>
               <a href={`/login`} key={'login'} className={classes.linkText}>
                <ListItem button>
                  <LockOpenIcon/>
                  <ListItemText primary={'login'} />
                </ListItem>
               </a>
               <a href={`/signup`} key={'sign up'} className={classes.linkText}>
                <ListItem button>
                  <PersonAddIcon/>
                  <ListItemText primary={'sign up'} />
                </ListItem>
               </a>
               
              </List>
  
           
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  else{
      if((sessionStorage.getItem("role") == "productmanager"))
      {
        return (
          <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
              
              <Toolbar>
              <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <HomeIcon/>
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Pep-E Commerce
                </Typography>
                 <List 
                 component="nav"
                 aria-labelledby="main navigation"
                 className={classes.navDisplayFlex}>
                  <a href={`/`} key={'home'} className={classes.linkText}>
                    <ListItem button>
                      <HomeIcon/>
                      <ListItemText primary={'home'} />
                    </ListItem>
                   </a>
                   <a href={`/orders`} key={'orders'} className={classes.linkText}>
                    <ListItem button>
                      <ReceiptIcon/>
                      <ListItemText primary={'orders'} />
                    </ListItem>
                   </a>
                   <a href={`/cart`} key={'cart'} className={classes.linkText}>
                    <ListItem button>
                      <ShoppingCartIcon/>
                      <ListItemText primary={'cart'} />
                    </ListItem>
                   </a>

                   <a href={`/productmanager/products`} key={'productmanager'} className={classes.linkText}>
                    <ListItem button>
                      <LockOpenIcon/>
                      <ListItemText primary={'productmanager'} />
                    </ListItem>
                   </a>
                   
                  </List>
      
               
              </Toolbar>
            </AppBar>
          </div>
        );
      }

      else if((sessionStorage.getItem("role") == "salesmanager"))
      {
        return (
          <div className={classes.root} >
            <AppBar position="static" className={classes.root}>
              
              <Toolbar>
              <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <HomeIcon/>
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Pep-E Commerce
                </Typography>
                 <List 
                 component="nav"
                 aria-labelledby="main navigation"
                 className={classes.navDisplayFlex}>
                  <a href={`/`} key={'home'} className={classes.linkText}>
                    <ListItem button>
                      <HomeIcon/>
                      <ListItemText primary={'home'} />
                    </ListItem>
                   </a>
                   <a href={`/orders`} key={'orders'} className={classes.linkText}>
                    <ListItem button>
                      <ReceiptIcon/>
                      <ListItemText primary={'orders'} />
                    </ListItem>
                   </a>
                   <a href={`/cart`} key={'cart'} className={classes.linkText}>
                    <ListItem button>
                      <ShoppingCartIcon/>
                      <ListItemText primary={'cart'} />
                    </ListItem>
                   </a>

                   <a href={`/salesmanager/orders`} key={'salesmanager'} className={classes.linkText}>
                    <ListItem button>
                      <LockOpenIcon/>
                      <ListItemText primary={'salesmanager'} />
                    </ListItem>
                   </a>
                   
                  </List>
      
               
              </Toolbar>
            </AppBar>
          </div>
        );
      }

      else
      {
        return (
          <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
              
              <Toolbar>
              <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <HomeIcon/>
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Pep-E Commerce
                </Typography>
                 <List 
                 component="nav"
                 aria-labelledby="main navigation"
                 className={classes.navDisplayFlex}>
                  <a href={`/`} key={'home'} className={classes.linkText}>
                    <ListItem button>
                      <HomeIcon/>
                      <ListItemText primary={'home'} />
                    </ListItem>
                   </a>
                   <a href={`/campaigns`} key={'special offers'} className={classes.linkText}>
                <ListItem button>
                  <StarIcon/>
                  <ListItemText primary={'special offers'} />
                </ListItem>
               </a>
                   <a href={`/orders`} key={'orders'} className={classes.linkText}>
                    <ListItem button>
                      <ReceiptIcon/>
                      <ListItemText primary={'orders'} />
                    </ListItem>
                   </a>
                   <a href={`/cart`} key={'cart'} className={classes.linkText}>
                    <ListItem button>
                      <ShoppingCartIcon/>
                      <ListItemText primary={'cart'} />
                    </ListItem>
                   </a>
      
                   
                  </List>
      
               
              </Toolbar>
            </AppBar>
          </div>
        );
      }
  }
}


