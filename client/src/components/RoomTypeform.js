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
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

}));


const tiers = [
  {
    title: '1인실',
    price: '50,000',
    description: [
        '10 users included', 
        '2 GB of storage', 
        'Help center access', 
        'Email support',
        '여기 내용 필요',
        
    ],
    buttonText: '선택',
    buttonVariant: 'outlined',
    
  },
  {
    title: '2인실',
    subheader: '',
    price: '100,000',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: '선택',
    buttonVariant: 'contained',
    
  },
  {
    title: '4인실',
    price: '200,000',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
      
    ],
    buttonText: '선택',
    buttonVariant: 'outlined',
    
  },
  {
    title: '6인실',
    price: '200,000',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
      
    ],
    buttonText: '선택',
    buttonVariant: 'outlined',
    
  },
];

export default function Pricing({GetPriceWon}) {
  const [selectPrice,setselectPrice] = useState(null);
  const classes = useStyles();
  const choose = (data)=> {
    GetPriceWon(data);
    setselectPrice(data);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
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
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null} // 별옵션
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
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>

                <CardActions >
                  <Button fullWidth key= {tier.title} variant={tier.buttonVariant} color="primary" onClick={()=>choose(tier.price)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>

              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}