"use strict";
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
let router = express.Router();
const cors = require('cors');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const saltRounds = 10;

const db = mysql.createConnection({

    "host": "110.13.222.97",
    "user": "ooioo",
    "password": "1234",
    "port": "13333",
    "database": "sonson"


});

function getFormatDate(date) {
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true

}));


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var date = new Date();

router.post('/checkid', (req, res) => {
    const q1 = `SELECT Login_ID FROM Customer WHERE Login_ID='${req.body.Login_ID}'`
    console.log(q1);
    db.query(
        q1,
        (err, result1) => {
            if (err) {
                console.log(err);
            }
            console.log(result1);
            if (result1.length == 0) {
                res.send({ isok: true })
            } else {
                res.send({ isok: false })
            }
        }
    )
})


router
    .post('/', (req, res) => {
        const Login_ID = req.body.Login_ID;
        const Login_PW = req.body.Login_PW;
        const passwordcheck = req.body.passwordcheck;
        const First_Name = req.body.First_Name;
        const Last_Name = req.body.Last_Name;
        const E_Mail = req.body.E_Mail;
        const Phone_Number = req.body.Phone_Number;
        const Zip = req.body.Zip; //우편번호
        const Apt_Num = req.body.Apt_Num; //상세주소
        const Fax = req.body.Fax;//팩스번호
        const Rank = 'red';
        const Validity_Month = 3;
        const Mileage = 1;
        const Reg_Date = getFormatDate(date);
        const Membership_Due_Date = getFormatDate(date);
        const Nationality = req.body.Nationality;
        const Birthday = req.body.Birthday;
        const Gender = req.body.Gender;
        const sqlInsert2 = "INSERT INTO Information(First_Name,Last_Name,E_Mail,Phone_Number,Zip,Apt_Num,Fax,Nationality,Birthday,Gender) VALUES (?,?,?,?,32164,?,?,?,?,?);"
        db.query(
            sqlInsert2,
            [First_Name, Last_Name, E_Mail, Phone_Number, Apt_Num, Fax, Nationality, Birthday, Gender],
            (err, result) => {
                console.log(result.insertId);
                const inserid = result.insertId;
                const sqlInsert = "INSERT INTO Customer (Login_ID,Login_PW,Inform_ID,Rank,Validity_Month,Mileage,Reg_Date,Membership_Due_Date) VALUES (?,?,?,?,?,?,?,?);"

                bcrypt.hash(Login_PW, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(hash);
                    db.query(
                        sqlInsert,
                        [Login_ID, hash, inserid, Rank, Validity_Month, Mileage, Reg_Date, Membership_Due_Date],
                        (err, result) => {
                            console.log(err);
                            console.log(result);

                        });

                });
                res.send({ result: true });
            });





    });
// module.exports = router;
module.exports = router;