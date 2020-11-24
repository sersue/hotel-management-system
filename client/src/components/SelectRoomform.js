import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },button:{
      margin : 0,
  },buttongrid:{
    padding: theme.spacing(1, 0.5 ,1),
  },button4:{
    backgroundColor: 'green',
    padding: ".285rem .815rem",
    border: "1px solid teal",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,

  },button2:{
    backgroundColor: 'red',
    padding: ".285rem .815rem",
    border: "1px solid teal",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,
  },button1:{
    backgroundColor: 'blue',
    padding: ".285rem .815rem",
    border: "1px solid teal",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,
  },gridbox:{

      border: '2px solid #d3d3d3',
      borderRadius: '5px',
  },

}));


const tiers = [
  {title: '201',type:'2'},
  {title: '202',type:'2'},
  {title: '203',type:'2'},
  {title: '204',type:'2'},
  {title: '205',type:'2'},
  {title: '206',type:'2'},
  {title: '207',type:'2'},
  {title: '208',type:'2'},
  {title: '209',type:'2'},
  {title: '210',type:'2'},
  {title: '211',type:'4'},
  {title: '212',type:'4'},
  {title: '213',type:'4'},
  {title: '214',type:'4'},
  {title: '214',type:'4'},
  {title: '214',type:'4'},
  {title: '214',type:'4'},
  {title: '214',type:'1'},
  {title: '214',type:'1'},
  {title: '214',type:'1'},
  
];

export default function Pricing({GetPriceWon}) {
  const [selectPrice,setselectPrice] = useState(null);
  const classes = useStyles();
  const choose = (data)=> {
    //GetPriceWon(data);
    //setselectPrice(data);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Select Room
        </Typography>
      </Container>
      
      <Container maxWidth="md" component="main">
        <Grid className={classes.gridbox} container spacing={5} alignItems="flex-end">
          
          {tiers.map((tier) => (
            <Grid  className={classes.buttongrid} key={tier.title}>
              <button className={tier.type==='2'? classes.button2:tier.type==='4'? classes.button4:classes.button1} onClick={()=>choose(tier.title)}>
                {tier.title}
              </button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}