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

router
    .get("/",(req,res)=>{
        const q = `select Room_Type from Room_Type`
        db.query(
            q,
            (err,result) =>{
                console.log(result[0]);
                console.log(err);
                res.send({Room_Type:result[0]});

                // if (result) {
                //     res.send({Customer_ID:req.session.user[0].Customer_ID,Login_ID: req.session.user[0].Login_ID,Name:result[0].First_Name+result[0].Last_Name, E_Mail:result[0].E_Mail,Phone_Number:result[0].Phone_Number,havecard:true,Card:result2})
                // }else{
                //     res.send({Customer_ID:req.session.user[0].Customer_ID,Login_ID: req.session.user[0].Login_ID,Name:result[0].First_Name+result[0].Last_Name, E_Mail:result[0].E_Mail,Phone_Number:result[0].Phone_Number ,havecard:false})
                //     }

                    
                
            }
        )
        console.log(q);
    
});
module.exports = router;