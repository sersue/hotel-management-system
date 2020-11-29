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

router.get('/',(req,res)=>{



});


module.exports = router;