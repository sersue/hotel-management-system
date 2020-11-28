"use strict";
const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const router = express.Router();
var router = express.Router();
// router.use(function(req,res,next){
//     console.log(req.url,"@",Date.now());
// });

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



// router.get("/mypage",(req,res)=>{

//     const Login_ID = req.body.ID,
//     const E_Mail=req.body.Email,
//     const Phone_Number=req.body.Phone,
//     //로그인되어있는지 확인
   
//         if(req.session.user){
//             models.Customer.findOne({
//                 where: {id: req.session.idx}
//             }).then(function(info){
//                 res.render('mypage',{data: JSON.stringify(info.dataValues)});
//             })
//         }
//         else
//             res.send("<script>alert('로그인이 필요합니다.')</script><meta http-equiv='refresh' content='0; url=http://localhost:3000/login'</meta>");
    

    
    
// });

//card table에 insert 
router.post('/', (req,res)=>{

    
    // if(req.session.user){
    //     console.log(req.session.user[0].Customer_ID);
    // }else{
    //     console.log("no"+res);
    // }
    // res.send();

    // const get = "SELECT COUNT (Customer_ID) as cid FROM Customer;"
    
    const BIN_Number=req.body.card_bin;
    const CVC=req.body.card_cvc;
    const Validity=req.body.card_validity;
    const Card_Password=req.body.card_password;
    const  Card_Serial= req.body.card_serial;
    const sqlInsert = "INSERT INTO Card (Card_Serial,BIN_Number,Customer_ID,CVC,Validity,Card_Password) VALUES (?,?,'" + (Customer_ID) + "',?,?,?);"
    let Customer_ID=req.session.user[0].Customer_ID;

    db.query(
        sqlInsert,
        (err,result)=>{
            console.log(result);
            bcrypt.hash(Card_Password,saltRounds,(err,hash)=>{
            if(err){
                console.log(err);
            }        
        
            db.query( 
                sqlInsert,
                [Card_Serial,BIN_Number,CVC,Validity,Card_Password],
                (err,result)=>{
                    // console.log(First_Name+""+Last_Name+""+E_Mail+" "+Login_PW);
                    console.log(err);
                });
            
        });

    });

});
module.exports = router;