import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
import { Dialog } from "@material-ui/core";

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import SingleRoom from './room_pages/singleroom';
import DoubleRoom from './room_pages/doubleroom';
import TripleRoom from './room_pages/tripleroom';
import OndolRoom from './room_pages/ondolroom';
import DeruxRoom from './room_pages/deluxroom';
import SweetRoom from './room_pages/sweetroom';
import TwinRoom from './room_pages/twinroom';

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: "Single",
    price: "75,000",
    description: [
      "-제한 인원 : 2명",
      "-싱글배드 : 1개",
      "-면적 : 16 (m2)",
    ],
    link: <SingleRoom></SingleRoom>
  },
  {
    title: "Double",
    subheader: "",
    price: "120,000",
    description: [
      '-제한 인원 : 4명',
      '-더블배드 : 1개',
      '-면적 : 18 (m2)',
    ],
    link: <DoubleRoom></DoubleRoom>
  },
  {
    title: "Ondol",
    price: "240,000",
    description: [
      '-제한 인원 : 6명',
      '-한국식 이불 : 2개',
      '-면적 : 34 (m2)',


    ],
    link: <OndolRoom></OndolRoom>
  },
  {
    title: "Triple",
    price: "200,000",
    description: [
      '-제한 인원 : 4명',
      '-싱글배드 : 3개',
      '-면적 : 26 (m2)',


    ],
    link: <TripleRoom></TripleRoom>
  },
  {
    title: "Derux Twin",
    price: "240,000",
    description: [
      '-제한 인원 : 4명',
      '-더블배드 : 2개',
      '-면적 : 28 (m2)',
    ],
    link: <DeruxRoom></DeruxRoom>
  },
  {
    title: "Sweet",
    price: "320,000",
    description: [
      '-제한 인원 : 8명',
      '-더블배드 : 2개',
      '-면적 : 40 (m2)',
    ],
    link: <SweetRoom></SweetRoom>
  },
  {
    title: "Twin",
    price: "150,000",
    description: [
      '-제한 인원 : 5명',
      '-싱글배드 : 2개',
      '-면적 : 26 (m2)',
    ],
    link: <TwinRoom></TwinRoom>
  },
];




export default function Pricing({ GetPriceWon, GetRoomType }) {
  const [selectPrice, setselectPrice] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogData, setData] = useState({});
  const classes = useStyles();

  // dialog를 키는 메소드
  const choose = (data) => {
    setOpen(true);
    setData(data);
  };
  // dialog를 끄는 메소드
  const handleClose = () => {
    setOpen(false);
    setData({});
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Room Type
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h6" color="textPrimary">
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /won
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        // align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    key={tier.title}
                    variant="outlined"
                    color="primary"
                    onClick={() => choose(tier)}
                  >
                    자세히
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Dialog open={open} maxWidth="lg" onClose={handleClose}>
            <DialogContent dividers>
              {dialogData.link}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                닫기
          </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
