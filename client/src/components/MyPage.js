import React, { useState, useEffect } from 'react';
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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';


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
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
    padding: 20,
    marginLeft: 8,
  },
  TextlistItem: {
    padding: theme.spacing(1, 0),
    padding: 20,
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
}));

export default function Review1() {
  Axios.defaults.withCredentials = true;
  const classes = useStyles();

  const [Name, setName] = useState();
  const [ID, setID] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [mycard, setmycard] = useState();
  const [iscardhave, setiscardhave] = useState(false);

  const [card_bin, setcard_bin] = useState('');
  const [card_cvc, setcard_cvc] = useState('');
  const [card_validity, setcard_validity] = useState('');
  const [card_password, setcard_password] = useState('');
  const [card_serial, setcard_serial] = useState('');

  const [cardbuttononclick,setcardbuttononclick] = useState(false);
  const submitInfo1 = () => {
    if (card_bin != null && card_cvc != null && card_validity != null && card_password != null && card_serial != null) {
      Axios.post('http://localhost:5000/mypage', {

        BIN_Number: card_bin,
        Card_Serial: card_serial,
        CVC: card_cvc,
        Validity: card_validity,
        Card_Password: card_password,

      }).then((res) => {
        if (res.data.result) {
          alert('데이터 수정 성공!');
        }
      });
    } else {
      alert("데이터 수정이 되지않았습니다.");
    }
  }

  function mycards() {
    return (
      <Grid container spacing={5} alignItems="flex-end">
        {mycard.map((card) => (
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardHeader title={"my card"} className={classes.cardHeader}></CardHeader>
              <CardContent className={classes.cardContent}>
                <Typography>
                  카드번호 : {card.BIN_Number + card.Card_Serial}
                </Typography>
                <Typography>
                  CVC    : {card.CVC}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    )
  }
  function cardadd() {
    return (
      <Grid container spacing={2} className={classes.TextlistItem}>
        <Grid item xs={5}>
          카드 앞 6자리
                <TextField
            defaultValue={"xxxx-xx"}
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
          카드 뒷 6자리
                <TextField
            defaultValue={"xx-xxxx-xxxx"}
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
          />
        </Grid>
        <Grid item xs={3}>
          CVC 번호
                <TextField
            defaultValue={"xxx"}
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
          />
        </Grid>
        <Grid item xs={10}>
          유효기간(달/년도)
      <TextField
            defaultValue={"MM/YY"}
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
          />
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              className={classes.button}
              onClick={submitInfo1}
              href='mypage'
            >
              추가하기
            </Button>
      </Grid>
    )
  }
  const cardaddbutton = () =>{
    setcardbuttononclick(true);
  }
  const [user, setuser] = useState(null);
  useEffect(() => {
    Axios.get('http://localhost:5000/mypage').then((response) => {
      console.log(response);
      setmycard(response.data.Card);
      setName(response.data.Name);
      setID(response.data.Login_ID);
      setEmail(response.data.E_Mail);
      setiscardhave(response.data.havecard);
      setPhone(response.data.Phone_Number);


    });

  }, []);

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
            <ListItem className={classes.listItem}>
              <ListItemText primary={Name} />
            </ListItem>
            ID
            <ListItem className={classes.listItem} >
              <ListItemText primary={ID} />
            </ListItem>
            Email
            <ListItem className={classes.listItem} >
              <ListItemText primary={Email} />
            </ListItem>

            Phone Number

          <Grid container spacing={2} className={classes.TextlistItem}>
              <Grid item xs={10}>
                <TextField
                  defaultValue={"Phone"}
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
            {iscardhave ? mycards() : ''}
            {!cardbuttononclick?(<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              className={classes.button}
              onClick={()=>cardaddbutton()}
            >
              카드 추가
            </Button>):cardadd()}





            



          </List>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}