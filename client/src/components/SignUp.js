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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'

import SelecltConuntry from './SelectCountry';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  Axios.defaults.withCredentials = true; // for cookie
  const classes = useStyles();
  const [firstName,setfirstName]=useState('');
  const [lastName,setlastName]=useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [date,setdate] = useState('');
  const [userid,setuserid] = useState('');
  const [passwordcheck,setpasswordcheck] = useState('');
  const [phoneNumber,setphoneNumber] = useState('');
  const [zip,setzip] = useState('');
  const [aptNumber,setaptNumber] = useState('');
  const [country,setcountry] = useState('');
  const [faxNumber,setfaxNumber] = useState('');
  const  getdate = ( date ) => setdate(date);
  const  getcountry = ( country  ) => setcountry(country );
  const submitInfo = () => {
    alert(country);
    Axios.post('http://localhost:5000/signup',{
      firstName:firstName,
      lastName :lastName,
      email:email, 
      password:password,
      aptNumber:aptNumber,
      zip:zip,
      phoneNumber:phoneNumber,
      passwordcheck:passwordcheck,
      userid:userid,
      date:date,
      faxNumber:faxNumber,
      country:country

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userid"
                label="ID"
                name="userid"
                autoComplete="userid"
                onChange={(e) => {
                  setuserid(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setpassword(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_Check"
                label="Password Check"
                type="password_Check"
                id="password_Check"
                autoComplete="current-password"
                onChange={(e) => {
                  setpasswordcheck(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                setfirstName(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                setlastName(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setemail(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                onChange={(e) => {
                  setphoneNumber(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="zip"
                label="우편번호"
                type="zip"
                id="zip"
                autoComplete="zip"
                onChange={(e) => {
                  setzip(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="aptNumber"
                label="상세주소"
                type="aptNumber"
                id="aptNumber"
                autoComplete="aptNumber"
                onChange={(e) => {
                  setaptNumber(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="faxNumber"
                label="팩스번호"
                type="faxNumber"
                id="faxNumber"
                autoComplete="faxNumber"
                onChange={(e) => {
                  setfaxNumber(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <SelecltConuntry getcountry ={getcountry}/>
            </Grid>
            <Grid item xs={12}>
              <SelecltDate getdate={getdate}/>
            </Grid>
            
            
             
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {submitInfo}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
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