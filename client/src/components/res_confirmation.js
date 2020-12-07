import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SelecltDate from './Date';



// 로그인 시 로그인 된 손님의 예약 정보 가져오기
const customer = [{ reservation_number: 123456, Room_type: '싱글룸', Room_number: 101, CheckIn: '2020/12/24', CheckOut: '2020/12/25' },
{ reservation_number: 120342, Room_type: '온돌룸', Room_number: 103, CheckIn: '2020/12/27', CheckOut: '2020/12/28' }];


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'디비디바비디부 © '}
      <Link color="inherit" href='/'>
        Del luna
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
      width: 800,
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
    padding: 10


  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  space: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  margin: {
    marginLeft: theme.spacing(1),
  },
  margin1: {
    marginLeft: theme.spacing(-0.6),
  },
  margin2: {
    marginLeft: theme.spacing(-0.2),
  },
  margin3: {
    marginLeft: theme.spacing(-1),
  },
  margin4: {
    marginLeft: theme.spacing(-6),
  }
}));

export default function Res_confirmation() {
  const classes = useStyles();

  const [tiers, settiers] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:5000/reservation/room').then((response) => {
      console.log(response.data)
      if (response.data.permission) {
        settiers(response.data.ResRoom);
      } else {
        settiers([]);
      }

    });

  }, []);
  const clickdis = (data) => {
    Axios.post('http://localhost:5000/reservation/unresroom', {
      Reservation_ID: data,
    }).then((response) => {
      console.log(response.data);
      settiers(response.data.ResRoom);


    });
  }

  return (

    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            예약 조회
          </Typography>
          <Grid className={classes.title} container spacing={2}>
            {tiers.length > 0 ?
              <>
                <Grid item xs={16} sm={2}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    예약 번호
                  </Typography>
                </Grid>
                <Grid item xs={16} sm={2}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    <margin className={classes.margin1}>객실 타입 </margin>
                  </Typography>
                </Grid>
                <Grid item xs={16} sm={2}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    <margin className={classes.margin2}>호수</margin>
                  </Typography>
                </Grid>
                <Grid item xs={16} sm={3}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    <margin className={classes.margin3}>체크인</margin>
                  </Typography>
                </Grid>
                <Grid item xs={16} sm={2}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    <margin className={classes.margin4} >체크아웃</margin>
                  </Typography>
                </Grid>
              </>
              : null
            }

          </Grid>
          {tiers.length > 0 ?
            <List>
              {tiers.map((a) => (
                <ListItem className={classes.listItem}>
                  <ListItemText className={classes.margin} primary={a.Reservation_ID} />
                  <ListItemText primary={a.Room_Type} />
                  <ListItemText primary={a.Room_Num} />
                  <ListItemText primary={a.Check_In.slice(undefined, 10)} />
                  <ListItemText primary={a.Check_Out.slice(undefined, 10)} />

                  {/* 취소하기버튼 */}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => clickdis(a.Reservation_ID)}
                    className={classes.buttons}>
                    취소하기
                    </Button>


                </ListItem>
              ))}
            </List>
            :
            <Typography component="h1" variant="h4" align="center">
              예약 정보가 없습니다.
            </Typography>
          }

        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}