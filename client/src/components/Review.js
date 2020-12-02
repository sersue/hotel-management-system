import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ CheckIn, CheckOut, Adult, Kid, PriceWon, RoomNumber, Getpricewon }) {
  const classes = useStyles();
  const [Totalprice, setTotalprice] = useState(0);
  let roominfo = []
  let cardinfo = []
  const [products, setproducts] = useState([]);
  const [userinfo, setuserinfo] = useState([]);
  useEffect(() => {
    Axios.post('http://localhost:5000/reservation/review', {
      RoomNumber: RoomNumber,
    }).then(async (response) => {
      console.log(response);
      console.log(response.data.Room);
      const A = async () => {
        for (let i = 0; i < response.data.Room.length; i++) {
          roominfo.push({ name: response.data.Room[i].Room_Num, desc: response.data.Room[i].Room_Type, price: response.data.Room[i].Price_won });
          setTotalprice(Totalprice + response.data.Room[i].Price_won);
        }
      }
      const B = async () => {
        setproducts(roominfo);
      }
      await A();
      await B();
      const C = async () => {
        if (response.data.user[0].haveCard) {
          cardinfo.push({ name: 'Card type', detail: response.data.user[0].usercard.Card_Type });
          cardinfo.push({ name: 'Card holder', detail: response.data.user[0].usercard.Bank });
          cardinfo.push({ name: 'Card number', detail: response.data.user[0].usercard.CardNum });
          cardinfo.push({ name: 'Expiry date', detail: response.data.user[0].usercard.Validity });
        } else {
          cardinfo.push({ name: '카드 정보가 없습니다.', detail: '' });
          cardinfo.push({ name: '결제 방법', detail: '' });
          cardinfo.push({ name: '카드 등록 :', detail: '마이페이지- 카드 등록' });
          cardinfo.push({ name: '현장 결제 :', detail: '방문시 결제' });
        }
      }
      const D = async () => {
        setuserinfo(cardinfo);
      }

      await C();
      await D();

    });

  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        예약 내용 확인
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Check IN : {CheckIn}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Check OUT : {CheckOut}
          </Typography>
        </Grid>
      </Grid>

      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name + "호"} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Totalprice}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {userinfo.map((info) => (
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>{info.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{info.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}