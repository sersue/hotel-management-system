"use strict";
const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const router = express();
const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let router = express.Router();


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





router
    .get("/",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user});
        
    }else{
        res.send({loggedIn:false});
    }
});

router
    .post("/",(req,res)=>{
    const Login_ID = req.body.Login_ID;
    const Login_PW = req.body.Login_PW;
    const sqlSelect = "SELECT * FROM Customer WHERE Login_ID = ?;"

    db.query(
        sqlSelect,
        Login_ID,
        (err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length > 0){
               bcrypt.compare(Login_PW,result[0].Login_PW,function(error,response){
                   if(response){
                       req.session.user=result;   
                       console.log("로그인");                   
                       res.send({result:true,user:result});
                       
                   }else{
                        console.log("wrong Login_ID/Login_PW combination");
                        res.send({result:false,messages:"Wrong Login_ID/Login_PW combination"});
                   }
               });            
            }else{
                console.log("User doesn't exist");
                res.send({result:false,messages:"User doesn't exist"});
            }
        }
    );
});


module.exports = router;