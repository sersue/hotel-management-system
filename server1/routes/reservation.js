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



function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

var date = new Date();

router.get('/',function (req,res,next){
    res.send('respond with a resource');
});

router.post('/',(req,res)=>{
    console.log(req.body);
    const Room_Num  = req.body.Room_Num;
    const Hotel_ID = 1;
    const Customer_ID=req.session.user[0].Customer_ID;
    const Price_Won  =req.body.Price_Won;
    const Check_In =req.body.Check_In;
    const Check_Out =req.body.Check_Out;
    const Adult  =req.body.Adult;
    const Child  =req.body.Child;
    const Pay_Date = getFormatDate(date);
    const Pay_Type  =req.body.Pay_Type;
    
    const sqlInsert2 = `INSERT INTO Reservation(Room_Num,Hotel_ID,Customer_ID,Price_Won,Check_In,Check_Out,Adult,Child,Pay_Date,Pay_Type) VALUES (?,?,${Customer_ID},?,?,?,?,?,?,?);`
    const sqlInsert1 = `SELECT Price_won FROM Room natural join Room_Type where Room_Num=(?)`
    {Room_Num.map((roomnum)=>(
        db.query(
            sqlInsert1,
            roomnum,
            (err1,result1)=>{
                if(err1){
                    console.log(err1);
                }
                else{
                    console.log(result1);
                    db.query(
                        sqlInsert2,
                        [roomnum,Hotel_ID,result1[0].Price_won,Check_In,Check_Out,Adult,Child,Pay_Date,Pay_Type],
                        (err2,result2)=>{
                            if(err2){
                                console.log(err2);
                            }
                            else{
                                console.log(err2);
                                console.log(result2);

                            }        
                        }
                    )
                }        
            }
        )

    ))}
    res.send({isok:true});
     

      
});
module.exports = router;