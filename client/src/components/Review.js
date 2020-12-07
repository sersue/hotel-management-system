import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
function dateDiff(_date1, _date2) {
  let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
  let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

  diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
  diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

  var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
  diff = Math.ceil(diff / (1000 * 3600 * 24));

  return diff;
}

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

export default function Review({ CheckIn, CheckOut, Adult, Kid, PriceWon, RoomNumber, getPayType }) {
  const classes = useStyles();
  const [Totalprice, setTotalprice] = useState(0);
  let roominfo = []
  let cardinfo = []
  let total = 0;
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
          total += response.data.Room[i].Price_won * dateDiff(CheckIn, CheckOut);
        }
      }
      const B = async () => {
        setproducts(roominfo);
        setTotalprice(total);
        total = 0;
      }
      await A();
      await B();
      const C = async () => {
        if (response.data.user[0].haveCard) {
          getPayType(true);
          cardinfo.push({ name: 'Card type', detail: response.data.user[0].usercard.Card_Type });
          cardinfo.push({ name: 'Card holder', detail: response.data.user[0].usercard.Bank });
          cardinfo.push({ name: 'Card number', detail: response.data.user[0].usercard.CardNum });
          cardinfo.push({ name: 'Expiry date', detail: response.data.user[0].usercard.Validity });
        } else {
          getPayType(false);
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
            <Typography variant="body2">{product.price} x {dateDiff(CheckIn, CheckOut)} ₩</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {Totalprice} ₩
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
