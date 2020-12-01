import React ,{useState, useEffect} from 'react';
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


const useStyles = makeStyles((theme) => ({
  
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 720,
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
  row: {
    flex: 1,
    flexDirection: 'row',
    },
  image: {
    width: '100%',
  },
}));


export default function TwinRoom() {
  const classes = useStyles();
  
  return (
    <>
  <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h3" align="left">
            트윈룸
          </Typography>
      <Grid className={classes.title} >
        <Grid>객실크기 : 26m2</Grid>
        <Grid>침대크기 : 싱글배드 2개</Grid>
      </Grid>
      <Typography className={classes.title} variant="h6" >
        객실시설
      </Typography>
        <Grid>욕실(화장실과 분리된 타입), 화장실(욕실과 분리된 타입), 인터넷 접속용 Wi-Fi 환경, 공기청정기(가습기용)</Grid>
      <Typography className={classes.title} variant="h6" >
        객실 어메니티
      </Typography>
      <Grid>오리털 이불, 욕실 매트, 헤어 브러시, 의류 방향제, 위생백, 세탁백, 구두광택용 페이퍼, 티슈, 미네랄 워터, 커피, 타월, 티 세트, 차(일본차), 면봉, 슬리퍼(일회용슬리퍼), 나이트 웨어, 헤어 드라이어, 페이스 타월, 목욕 타월, 샤워 캡, 면도기, 양치 세트, 페이스 소프, 바디 소프, 샴푸, 컨디셔너</Grid>
      </Paper>
        
      <Paper className={classes.paper}>
      <img src='images/twin.jpeg' className={classes.image}></img>
      <img src='images/twin1.jpg' className={classes.image}></img>
      <img src='images/toilet.jpg' className={classes.image}></img>

      </Paper>
      </main>
    </React.Fragment>
    </>
  );
}
