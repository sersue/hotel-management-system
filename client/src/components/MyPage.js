import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SelecltDate from './Date';
import Axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const inform = [ {ID:'123', name:'KIM HA NA', Email:'qwe@naver.com', Phone:'010-1234-1234', card_bin:"XXXX-XX", 
card_serial:"XX-XXXX-XXXX", card_cvc:"000",card_validity:"00/00",card_password:"0000"} ];

// db에서 mypage관련데이터 배열 불러오기 
// const inform1 = [{card_bin:,card_serial:,card_cvc:,card_validity:,card_password:}];

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
    padding : 20,
    marginLeft : 8,
  },
  TextlistItem: {
    padding: theme.spacing(1, 0),
    padding : 20,
  },
}));

export default function Review1() {
  Axios.defaults.withCredentials = true;
  const classes = useStyles();

  const [ID,setID]=useState('');
  const [Email,setEmail]=useState('');
  const [Phone,setPhone] = useState('');
  const [card_bin,setcard_bin] = useState('');
  const [card_cvc,setcard_cvc] = useState('');
  const [card_validity,setcard_validity] = useState('');
  const [card_password,setcard_password] = useState('');
  const [card_serial,setcard_serial]=useState('');
  
 
  const submitInfo1 = () => {
    if(card_bin!=null&&card_cvc!=null&&card_validity!=null&&card_password!=null&&card_serial!=null){
      Axios.post('http://localhost:5000/mypage',{
      
      BIN_Number:card_bin,
      Card_Serial:card_serial,
      CVC:card_cvc,
      Validity:card_validity,
      Card_Password:card_password,
      
    }).then((res)=>{
      if(res.data.result){
        alert('데이터 수정 성공!');
      }
      // console.log(response.data.user[0]);
      // if(response){
      //   const inform1 = request.session.user[0];
      //   alert(inform1);
      // }
    });
    }else{
      alert("데이터 수정이 되지않았습니다.");
    }}
    

    
  useEffect(()=>{
    Axios.get('http://localhost:5000/mypage').then((response)=>{
      // if(response.data.loggedIn == true){
        
      // }
      console.log(response); //login 되면 console loggedin 값 true
    }); //get : refresh 하면 login in or not 

  },[]);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
            내 정보
          </Typography>
      <List disablePadding>
        Name
        {inform.map((a) => (
          <ListItem className={classes.listItem} key={a.name} >
            <ListItemText primary={a.name}/>
          </ListItem>
        ))}
        ID
        {inform.map((a) => (
          <Grid container spacing={2} className={classes.TextlistItem}>
            <Grid item xs={10}>
            <TextField
            defaultValue = {a.ID}
            variant="outlined"
            required
            fullWidth
            name="ID"
            type="ID"
            id="ID"
            autoComplete="current-ID"
            onChange={(e) => {
              setID(e.target.value);
              }}
            
          /></Grid>
          </Grid>
        ))}
        Email
        {inform.map((a) => (
          <Grid container spacing={2} className={classes.TextlistItem}>
            <Grid item xs={10}>
            <TextField
            defaultValue = {a.Email}
            variant="outlined"
            required
            fullWidth
            name="Email"
            type="Email"
            id="Email"
            autoComplete="current-Email"
            onChange={(e) => {
              setEmail(e.target.value);
              }}
          /></Grid>
          </Grid>
          
        ))}
        Phone Number
        {inform.map((a) => (
          <Grid container spacing={2} className={classes.TextlistItem}>
          <Grid item xs={10}>
          <TextField
          defaultValue = {a.Phone}
          variant="outlined"
          required
          fullWidth
          name="Phone"
          type="Phone"
          id="Phone"
          autoComplete="current-Phone"
          onChange={(e) => {
            setPhone(e.target.value);
              }}
        /></Grid>
        </Grid>
        ))}
        Card Number
        {inform.map((a) => (
          <Grid container spacing={2} className={classes.TextlistItem}>
          <Grid item xs={5}>
            카드 앞 6자리
          <TextField
          defaultValue = {a.card_bin}
          variant="outlined"
          required
          fullWidth
          name="bin"
          type="bin"
          id="bin"
          autoComplete="current-bin"
          onChange={(e) => {
            setcard_bin(e.target.value);
              }}
        /></Grid>
        <Grid item xs={5}>
            카드 앞 6자리를 제외한 카드번호
          <TextField
          defaultValue = {a.card_serial}
          variant="outlined"
          required
          fullWidth
          name="serial"
          type="serial"
          id="serial"
          autoComplete="current-serial"
          onChange={(e) => {
            setcard_serial(e.target.value);
              }}


        /></Grid>
        <Grid item xs={3}>
            CVC 번호
          <TextField
          defaultValue = {a.card_cvc}
          variant="outlined"
          required
          fullWidth
          name="cvc"
          type="cvc"
          id="cvc"
          autoComplete="current-cvc"
          onChange={(e) => {
            setcard_cvc(e.target.value);
              }}
        /></Grid>
        <Grid item xs={10}>
            유효기간(달/년도)
            <TextField
          defaultValue = {a.card_validity}
          variant="outlined"
          required
          fullWidth
          name="validity"
          type="validity"
          id="validity"
          autoComplete="current-validity"
          onChange={(e) => {
            setcard_validity(e.target.value);
              }}
        />
        </Grid>
            <Grid item xs={5}>
            비밀번호
          <TextField
          defaultValue = {a.card_password}
          variant="outlined"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setcard_password(e.target.value);
              }}
        /></Grid>
        {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {submitInfo}
            href='/'
          >
            Sign Up
          </Button> */}

        </Grid>
        
        ))}
      </List>
      <React.Fragment>
          <div className={classes.buttons}>
                  {
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    className={classes.button}
                    onClick = {submitInfo1}
                    
                    // href='/'
                  >
                    수정하기
                  </Button>
                    // <Button 
                    // href='/'
                    // variant="contained"
                    // color="primary"
                    // onClick={onclick} 
                    // className={classes.button}
                    // // onClick = {submitInfo}
                    // >
                    //   수정하기
                    // </Button>
                }
                </div>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}