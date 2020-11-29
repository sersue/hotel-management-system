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
        console.log('세션 정보 확인')
    if(req.session.user){
        console.log('세션 존재')
        res.send({permission:true,user:req.session.user});
        
    }else{
        console.log('세션 없음')
        res.send({permission:false});
    }
});

// router.get("/",(req,res)=>{

//     // const Login_ID = req.body.ID,
//     // const E_Mail=req.body.Email,
//     // const Phone_Number=req.body.Phone,
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
router.post('/', async (req,res)=>{


    let Customer_ID=req.session.user[0].Customer_ID;
    let body = req.body;

    const q= "INSERT INTO Card (BIN_Number,Card_Serial,Customer_ID,CVC,Validity,Card_Password) VALUES (?,?,'" + (Customer_ID) + "',?,?,?);"

    let pwEncrpt = async() => {
        console.log('카드비번 암호화 시작');
        await bcrypt.genSalt(saltRounds,async(err,salt)=>{
            await bcrypt.hash(req.body.card_password,salt,async(err,hash)=>{
                console.log('비번 암호화 완료');
                let value = await makeValue(hash);
                let pushdb = await dbInsert(q,value);
            });
        });
    };
    let dbInsert = async (q, value)=>{
        console.log('db에 쿼리 입력');
        db.query(
            q,
            value,
            (err,rows,fields)=>{
            if(err){
                console.log(err);
            }else{
                console.log('등록완료');
                res.send(rows);
            }

        });
    };
    let makeValue= async (sp)=>{
        console.log('암호화된 비번으로 갱신');
        req.body.card_password = sp;
        return Object.values(body);
    };

    let ret = await pwEncrpt();

    // db.query(
    //     "INSERT INTO Card (Card_Serial,BIN_Number,Customer_ID,CVC,Validity,Card_Password) VALUES (?,?,'" + (Customer_ID) + "',?,?,?);"
    //     ,
    //     (err,result)=>{
    //         console.log(result);
    //         bcrypt.hash(Card_Password,saltRounds,(err,hash)=>{
    //         if(err){
    //             console.log(err);
    //         }        
        
    //         db.query( 
    //             sqlInsert,
    //             [Card_Serial,BIN_Number,CVC,Validity,Card_Password],
    //             (err,result)=>{
    //                 // console.log(First_Name+""+Last_Name+""+E_Mail+" "+Login_PW);
    //                 console.log(err);
    //             });
            
    //     });

    // });

});
module.exports = router;