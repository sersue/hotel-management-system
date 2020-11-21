import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import SelecltDate from './Date';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 3, 2),
    width : 200,
  },

  re:{
    margin : theme.spacing(1,1,1),
    backgroundColor :'#c8c8c8',
    borderRadius: '7px',
  }
}));

export default function SignUp() {
  Axios.defaults.withCredentials = true; // for cookie
  const classes = useStyles();
  const [CheckIn,setCheckIn]=useState('');
  const [CheckOut,setCheckOut]=useState('');
  const [Adult,setAdult] = useState('');
  const [Kid,setKid] = useState('');
  const [PayDate,setPayDate] = useState('');
  const [PayType,setPayType] = useState('');
  const [PriceWon,setPriceWon] = useState('');
  const [RoomNumber,setRoomNumber] = useState('');
  const [CustomerId,setCustomerId] = useState('');

  const  getCheckIn = ( date ) => setCheckIn(date);
  const  getCheckOut = ( date  ) => setCheckOut(date );
  const submitInfo = () => {
    Axios.post('http://localhost:5000/signup',{
    }).then(()=>{
      alert('successful insert');
    });
  };

  useEffect(()=>{
    Axios.get('http://localhost:5000/login').then((response)=>{
      // if(response.data.loggedIn == true){
        
      // }
      console.log(response); //login 되면 console loggedin 값 true
    }); //get : refresh 하면 login in or not 

  },[]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalHotelIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reservation
        </Typography>
        <form className={classes.form} noValidate>
          <Grid className={classes.re} container spacing={2}>
            <Grid item xs={12} sm={3}>
              <SelecltDate getdate={getCheckIn} Lableing={"체그인"}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelecltDate getdate={getCheckOut} Lableing={"체그인"}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Adult"
                label="Adult"
                type="Adult"
                id="Adult"
                autoComplete="current-password"
                onChange={(e) => {
                  setAdult(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                autoComplete="fname"
                name="Kid"
                variant="outlined"
                required
                fullWidth
                id="Kid"
                label="Kid"
                autoFocus
                onChange={(e) => {
                setKid(e.target.value);
              }}
              />
            </Grid>    

            <Grid container justify="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {submitInfo}
                href='/'
              >
                NEXT
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}