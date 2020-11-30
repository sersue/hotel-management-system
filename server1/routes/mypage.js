"use strict";
const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;


var router = express.Router();


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
// req.session.user
router
    .get("/",(req,res)=>{
        console.log('세션 정보 확인')
        

    if(req.session.user){
        console.log('세션 존재')
        const q = `select First_Name,Last_Name,E_Mail ,Phone_Number from Information where Inform_ID= '${req.session.user[0].Inform_ID}'`
        db.query(
            q,
            (err,result) =>{
                console.log(result[0]);
                console.log(err);
                const qcard = `select Card_Serial,BIN_Number,CVC from Card where Customer_ID = ${req.session.user[0].Customer_ID}`
                db.query(
                    qcard,
                    (err,result2)=>{
                        console.log(result2);
                        console.log(err);
                        if (result2) {
                            res.send({Login_ID: req.session.user[0].Login_ID,Name:result[0].First_Name+result[0].Last_Name, E_Mail:result[0].E_Mail,Phone_Number:result[0].Phone_Number,havecard:true,Card:result2})
                        }else{
                            res.send({Login_ID: req.session.user[0].Login_ID,Name:result[0].First_Name+result[0].Last_Name, E_Mail:result[0].E_Mail,Phone_Number:result[0].Phone_Number ,havecard:false})
                        }

                    }
                )
            }
        )
        console.log(q);
    }else{
        console.log('세션 없음')
        res.send({permission:false});
    }
});


//card table에 insert 
router.post('/', (req,res)=>{

    let Customer_ID=req.session.user[0].Customer_ID;
    const BIN_Number = req.body.BIN_Number;
    const Card_Serial = req.body.Card_Serial;
    const CVC = req.body.CVC;
    const Validity = req.body.Validity;
    const Card_Password = req.body.Card_Password;

    const q= "INSERT INTO Card (BIN_Number,Card_Serial,Customer_ID,CVC,Validity,Card_Password) VALUES (?,?,'" + (Customer_ID) + "',?,?,?);"

   
    bcrypt.hash(Card_Password,saltRounds,(err,hash)=>{

        if(err){
            console.log(err);
        }        
        console.log(hash);
        db.query( 
            q,
            [BIN_Number,Card_Serial,CVC,Validity,hash],
            (err,result)=>{
                console.log(err);
                console.log(result);
                res.send({result:true});
            });
        
    });
    

});



        

   
module.exports = router;