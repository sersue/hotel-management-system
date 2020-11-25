import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SelecltDate from './Date';

const inform = [ {ID:'123', name:'KIM HA NA', Email:'qwe@naver.com', Phone:'010-1234-1234', card_bin:"XXXX-XX", 
card_serial:"XX-XXXX-XXXX", card_cvc:"000",card_validity:"00/00",card_password:"0000"} ];



const useStyles = makeStyles((theme) => ({

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
  const classes = useStyles();

  return (
    <React.Fragment>
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
        /></Grid>
        </Grid>
        ))}
      </List>
    
    </React.Fragment>
  );
}