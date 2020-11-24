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
import Genderset from './Gender';
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
  const [First_Name,setFirst_Name]=useState('');
  const [Last_Name,setLast_Name]=useState('');
  const [E_Mail,setE_Mail] = useState('');
  const [Login_PW,setLogin_PW] = useState('');
  const [Birthday,setBirthday] = useState('');
  const [Login_ID,setLogin_ID] = useState('');
  const [Login_PWcheck,setLogin_PWcheck] = useState('');
  const [Phone_Number,setPhone_Number] = useState('');
  const [Zip,setZip] = useState('');
  const [Apt_Num,setApt_Num] = useState('');
  const [Nationality,setNationality] = useState('');
  const [Fax,setFax] = useState('');
  const [Gender,setGender] = useState('');
  const  getBirthday = ( Birthday ) => setBirthday(Birthday);
  const  getNationality = ( Nationality  ) => setNationality(Nationality );
  const  getgender = ( Gender  ) => setGender(Gender );
  const submitInfo = () => {
    alert(Birthday);
    Axios.post('http://localhost:5000/signup',{
      First_Name:First_Name,
      Last_Name :Last_Name,
      E_Mail:E_Mail, 
      Login_PW:Login_PW,
      Apt_Num:Apt_Num,
      Zip:Zip,
      Phone_Number:Phone_Number,
      Login_ID:Login_ID,
      Birthday:Birthday,
      Fax:Fax,
      Nationality:Nationality.label,
      Gender:Gender

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
        <form className={classes.form} noValiBirthday>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Login_ID"
                label="ID"
                name="Login_ID"
                autoComplete="Login_ID"
                onChange={(e) => {
                  setLogin_ID(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Login_PW"
                label="Login_PW"
                type="Login_PW"
                id="Login_PW"
                autoComplete="current-Login_PW"
                onChange={(e) => {
                  setLogin_PW(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Login_PW_Check"
                label="Login_PW Check"
                type="Login_PW_Check"
                id="Login_PW_Check"
                autoComplete="current-Login_PW"
                onChange={(e) => {
                  setLogin_PWcheck(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="First_Name"
                variant="outlined"
                required
                fullWidth
                id="First_Name"
                label="First Name"
                autoFocus
                onChange={(e) => {
                setFirst_Name(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Last_Name"
                label="Last Name"
                name="Last_Name"
                autoComplete="lname"
                onChange={(e) => {
                setLast_Name(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="E_Mail"
                label="E_Mail"
                name="E_Mail"
                autoComplete="E_Mail"
                onChange={(e) => {
                  setE_Mail(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Phone_Number"
                label="Phone number"
                name="Phone_Number"
                autoComplete="Phone_Number"
                onChange={(e) => {
                  setPhone_Number(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Zip"
                label="우편번호"
                type="Zip"
                id="Zip"
                autoComplete="Zip"
                onChange={(e) => {
                  setZip(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Apt_Num"
                label="상세주소"
                type="Apt_Num"
                id="Apt_Num"
                autoComplete="Apt_Num"
                onChange={(e) => {
                  setApt_Num(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Fax"
                label="팩스번호"
                type="Fax"
                id="Fax"
                autoComplete="Fax"
                onChange={(e) => {
                  setFax(e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <SelecltConuntry getNationality ={getNationality}/>
            </Grid>
            <Grid item xs={12}>
              <SelecltDate getdate={getBirthday} Lableing={"생년월일"}/>
            </Grid>

           
            <Grid item xs={12}>
              <Genderset getgender={getgender}></Genderset>
            </Grid> 
             
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraE_Mails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and upBirthdays via E_Mail."
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
            href='/'
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
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