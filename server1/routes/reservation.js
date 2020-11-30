"use strict";
const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const router = express();
const mysql = require('mysql');
const cors= require('cors');


let router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const db= mysql.createConnection({
    
    "host": "110.13.222.97",
    "user": "ooioo",
    "password": "1234",
    "port": "13333",
    "database": "sonson"
  
  
});

router.use(cors({
origin : ["http://localhost:3000"],
methods:["GET","POST"],
credentials :true

}));
router.use(express.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser());

router.use(session({
    key:"user",
    secret:"abc",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60 * 60 *24,
    },
}));

router.get('/',function (req,res,next){
    res.send('respond with a resource');
});

router.post('/',(req,res)=>{
    const Room_Num  = 208;
      const Hotel_ID = 1;
      let Customer_ID=req.session.user[0].Customer_ID;
      const Price_Won  =req.body.Price_Won;
      const Check_In =req.body.Check_In;
      const Check_Out =req.body.Check_Out;
      const Adult  =req.body.Adult;
      const Child  =req.body.Child;
      const Pay_Date = req.body.Pay_Date;
      const Pay_Type  ='Card';  
     
      const sqlInsert = "INSERT INTO Reservation(Room_Num,Hotel_ID,Customer_ID,Price_Won,Check_In,Check_Out,Adult,Child,Pay_Date,Pay_Type) VALUES (?,?,'" + (Customer_ID) + "',?,?,?,?,?,?,?);"
    db.query(
        sqlInsert,
        [Room_Num,Hotel_ID,Price_Won,Check_In,Check_Out,Adult,Child,Pay_Date,Pay_Type],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(err);
                console.log(result);
                res.send({result:true});
            }        
        }
    )
     
     

      
});
module.exports = router;