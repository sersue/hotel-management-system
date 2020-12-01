import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CheckInOutform from './CheckInOutform';
import RoomTypeform from './RoomTypeform';
import Axios from 'axios';
import Review from './Review';
import SelectRoom from './SelectRoomform';

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
      width: 700,
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Check IN-OUT', 'Room Type','Select Room','Review your order'];

function getStepContent(step,{getCheckIn,getCheckOut,getAdult,getKid,getPriceWon,CheckIn,CheckOut,Adult,Kid,PriceWon,getRoomNumber,RoomType,RoomNumber}) {
  switch (step) {
    case 0:
      return <CheckInOutform GetCheakIN = {getCheckIn} GetCheakOUT= {getCheckOut} GetAdult= {getAdult} GetKid= {getKid}/>;
    case 1:
      return <RoomTypeform />;
    case 2:
      return <SelectRoom Getroomnuber={getRoomNumber} CheckIn={CheckIn} CheckOut={CheckOut}/>;
    case 3:
      return <Review CheckIn={CheckIn} CheckOut={CheckOut} Adult={Adult} Kid={Kid} PriceWon={PriceWon} RoomNumber={RoomNumber} Getpricewon={getPriceWon}/>;  
    default:
      throw new Error('Unknown step');
  }
}

export default function ReservationMain() {
  Axios.defaults.withCredentials = true; // for cookie
  const classes = useStyles();
  const [CheckIn,setCheckIn]=useState(null);
  const [CheckOut,setCheckOut]=useState(null);
  const [Adult,setAdult] = useState(null);
  const [Kid,setKid] = useState(null);
  const [PayDate,setPayDate] = useState('');
  const [PayType,setPayType] = useState('');
  const [PriceWon,setPriceWon] = useState(null);
  const [RoomNumber,setRoomNumber] = useState(null);
  const [CustomerId,setCustomerId] = useState(null);
  const [RoomType,setRoomType] = useState(null);


  const getCheckIn = ( date ) => setCheckIn(date);
  const getCheckOut = ( date  ) => setCheckOut(date);
  const getAdult = (date) => setAdult(date);
  const getKid = (date) => setKid(date);
  const getPriceWon = (date) => setPriceWon(date);
  const getRoomNumber = (date) => setRoomNumber(date);
  const getRoomType = (date) => setRoomType(date);
  

  let today = new Date();  
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitInfo = () => {
    setActiveStep(activeStep + 1);
    console.log(CheckIn,CheckOut);
    if(CheckOut!=null &&CheckIn<CheckOut &&Adult!=null){
      Axios.post('http://localhost:5000/reservation',{
        Check_In :CheckIn,
        Check_Out :CheckOut,
        Price_Won :PriceWon,
        Adult : Adult,
        Child :Kid,
        Pay_Type: 'Card',
        Room_Num: RoomNumber,
        Pay_Date: (today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()),
      }).then((res)=>{
        if (res.data.isok) {
          alert("예약 완료")
        }
      });
    }else{
      alert("예약에 실패했습니다");
    }

  };
  

  useEffect(()=>{
    Axios.get('http://localhost:5000/reservation').then((response)=>{
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
            예약하기
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,{getCheckIn,getCheckOut,getAdult,getKid,getPriceWon,getRoomType,CheckIn,CheckOut,Adult,Kid,PriceWon,getRoomNumber,RoomType,RoomNumber})}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    
                    onClick = {activeStep === steps.length - 1 ? submitInfo : handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
      
    </React.Fragment>
    
  );
}