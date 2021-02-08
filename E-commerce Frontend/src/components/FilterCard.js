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




const useStyles = makeStyles({
  root: {
    width: '240px',
    height: '620px',
    marginLeft: '1650px',
    marginTop: '50px',
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
    fontSize: 20,
    color: 'white',
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
});

export default function FilterCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [sortType, setValue1] = React.useState('Name');
  const [sortType2, setValue2] = React.useState('Ascending');
  const [minPrice, setMinPrice] = React.useState(0.0);
  const [maxPrice, setMaxPrice] = React.useState(1000.0);
  const [minRating, setMinRating] = React.useState(0.0);
  const [maxRating, setMaxRating] = React.useState(5.0);



  
  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleChange3 = (event) => {
    setMinPrice(event.target.value);
  };

  const handleChange4 = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleChange5 = (event) => {
    setMinRating(event.target.value);
  };

  const handleChange6 = (event) => {
    setMaxRating(event.target.value);
  };
  

  function filterAndSort() {
      var obj = new Object();
      obj.minPrice = minPrice;
      obj.maxPrice = maxPrice;
      obj.minRating = minRating;
      obj.maxRating = maxRating;
      obj.sortingAttribute = sortType;
      obj.sortingType = sortType2;
      var jsonobj = JSON.stringify(obj)
      sessionStorage.setItem("minPrice", minPrice)
      sessionStorage.setItem("maxPrice", maxPrice)
      sessionStorage.setItem("minRating", minRating)
      sessionStorage.setItem("maxRating", maxRating)
      sessionStorage.setItem("sortingAtt", sortType)
      sessionStorage.setItem("sortingType", sortType2)

      fetch('/products/' , {
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
      ).then(products => {
          console.log(products)
          sessionStorage.setItem("products", JSON.stringify(products))
          window.location.reload();

      });


  }

  if(!sessionStorage.getItem("products"))
  {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Filter Products
        </Typography>
        <br></br>
        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        Min Price: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange3} value={minPrice}></input>
        </Typography>
        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        Max Price: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange4} value={maxPrice}></input>
        </Typography>
        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        Min Rating: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange5} value={minRating}></input>
        </Typography>
        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        Max Rating: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange6} value={maxRating}></input>
        </Typography>
        <br></br>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Sort By
        </Typography>

        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={sortType} onChange={handleChange1}>
        <FormControlLabel value="Name" control={<Radio />} label="Name" />
        <FormControlLabel value="Price" control={<Radio />} label="Price" />
        <FormControlLabel value="Rating" control={<Radio />} label="Rating" />
      </RadioGroup>
    </FormControl>
        </Typography>
        
        <br></br>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Sorting Type
        </Typography>

        <Typography className={classes.title3} color="textSecondary" gutterBottom>
        <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={sortType2} onChange={handleChange2}>
        <FormControlLabel value="Ascending" control={<Radio />} label="Ascending" />
        <FormControlLabel value="Descending" control={<Radio />} label="Descending" />
      </RadioGroup>
    </FormControl>
        </Typography>
        <br></br>

        <Button
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={()=>filterAndSort()}
            >
              FILTER/SORT
            </Button>


        
        
      </CardContent>
    </Card>
  );
  }
  else {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Filter Products
          </Typography>
          <br></br>
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          Min Price: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange3} value={minPrice}></input>
          </Typography>
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          Max Price: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange4} value={maxPrice}></input>
          </Typography>
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          Min Rating: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange5} value={minRating}></input>
          </Typography>
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          Max Rating: <input type='number' step='0.1' className={classes.inputClass} onChange={handleChange6} value={maxRating}></input>
          </Typography>
          <br></br>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Sort By
          </Typography>
  
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={sortType} onChange={handleChange1}>
          <FormControlLabel value="Name" control={<Radio />} label="Name" />
          <FormControlLabel value="Price" control={<Radio />} label="Price" />
          <FormControlLabel value="Rating" control={<Radio />} label="Rating" />
        </RadioGroup>
      </FormControl>
          </Typography>
          
          <br></br>
  
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Sorting Type
          </Typography>
  
          <Typography className={classes.title3} color="textSecondary" gutterBottom>
          <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={sortType2} onChange={handleChange2}>
          <FormControlLabel value="Ascending" control={<Radio />} label="Ascending" />
          <FormControlLabel value="Descending" control={<Radio />} label="Descending" />
        </RadioGroup>
      </FormControl>
          </Typography>
          <br></br>
  
          <Button
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={()=>filterAndSort()}
              >
                FILTER/SORT
              </Button>
        </CardContent>
      </Card>
    );
  }
}
