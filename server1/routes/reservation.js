"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const cors = require('cors');
const { request } = require('express');
const { compare } = require('bcrypt');


let router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({

    "host": "110.13.222.97",
    "user": "ooioo",
    "password": "1234",
    "port": "13333",
    "database": "sonson"


});

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true

}));
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.use(session({
    key: "user",
    secret: "abc",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));



function getFormatDate(date) {
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

var date = new Date();

router
    .get("/", (req, res) => {
        console.log('세션 정보 확인')

        if (req.session.user) {
            console.log('사용자 확인')
            res.send({ permission: true, Customer_ID: req.session.user[0].Customer_ID })
        } else {
            console.log('세션 없음')
            res.send({ permission: false });
        }
    });


router
    .get("/room", (req, res) => {
        console.log('세션 정보 확인')

        if (req.session.user) {
            console.log('사용자 확인')
            const q1 = `SELECT Reservation_ID,Room_Type,Room_Num,Check_In,Check_Out FROM Reservation NATURAL JOIN Room_Type WHERe Customer_ID='${req.session.user[0].Customer_ID}'`
            db.query(
                q1,
                (err1, result1) => {
                    if (err1) {
                        console.log(err1)
                    }
                    res.send({ permission: true, Customer_ID: req.session.user[0].Customer_ID, ResRoom: result1 });
                }
            )

        } else {
            console.log('세션 없음')
            res.send({ permission: false });
        }
    });
router.post('/review', async (req, res) => {
    const Customer_ID = req.session.user[0].Customer_ID;
    const Room_Num = req.body.RoomNumber;
    let result = [];
    let usercard = [];
    console.log(req.session.user[0].Customer_ID);

    const selectRoomInfo = async () => {
        const q1 = `SELECT Room_Num ,Room_Type ,Price_won FROM Room_Type natural join Room WHERE Room_Num=(?)`;
        Room_Num.map((num) => (
            db.query(
                q1,
                [num],
                (err1, result1) => {
                    if (err1) {
                        console.log(err1);
                    }
                    result.push(result1[0]);
                }
            )
        ));
    }

    const getCardsData = async () => {
        const q2 = `SELECT Bank,Card_Type,CONCAT(BIN_Number,Card_Serial) AS CardNum,Validity FROM Card NATURAL JOIN Card_BIN WHERE Customer_ID='${Customer_ID}'`
        db.query(
            q2,
            (err2, result2) => {
                if (err2) {
                    console.log(err2);
                }

                if (result2.length == 0) {
                    usercard.push({ haveCard: false })
                    console.log(usercard);
                } else {
                    usercard.push({ haveCard: true, usercard: result2[0] });
                    console.log(usercard);
                }

                res.send({ Room: result, user: usercard });
            }
        )
    }

    await selectRoomInfo();
    await getCardsData();
});

router.post('/getroom', function (req, res) {

    const q = `SELECT DISTINCT Room_Num AS title, Room_Type AS type, (Room_Num DIV 100) AS floor, (FALSE) AS res from Room natural join Room_Type where Hotel_ID =1 AND Room_Num NOT IN (SELECT distinct Room_Num FROM Reservation NATURAL JOIN Room WHERE NOT(Check_Out < ${req.body.Check_In} OR Check_In < ${req.body.Check_Out})) union (SELECT distinct Room_Num AS title, Room_Type AS type, (Room_Num DIV 100) AS floor, (TRUE) AS res FROM Reservation NATURAL JOIN Room WHERE Hotel_ID =1 AND NOT(Check_Out < ${req.body.Check_In} OR Check_In < ${req.body.Check_Out})) order by title asc;`;
    db.query(
        q,
        (err, result1) => {
            if (err) {
                console.log(err);
            }
            console.log(result1);
            res.send(result1);
        }
    )
});
router.post('/unresroom', function (req, res) {
    console.log("예약 취소 시작");
    const q1 = `DELETE FROM Reservation WHERE Reservation_ID='${req.body.Reservation_ID}'`
    db.query(
        q1,
        (err1, result1) => {
            if (err1) {
                console.log(err1);
            }
            console.log("예약 취소");
            const q2 = `SELECT Reservation_ID,Room_Type,Room_Num,Check_In,Check_Out FROM Reservation NATURAL JOIN Room_Type WHERe Customer_ID='${req.session.user[0].Customer_ID}'`
            db.query(
                q2,
                (err2, result2) => {
                    if (err2) {
                        console.log(err1)
                    }
                    console.log(result2);
                    res.send({ permission: true, Customer_ID: req.session.user[0].Customer_ID, ResRoom: result2 });
                }
            )
        }
    )
});

router.post('/', function (req, res) {
    function dateDiff(_date1, _date2) {
        let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
        let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

        diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
        diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));

        return diff;
    }
    const Room_Num = req.body.Room_Num;
    const Hotel_ID = 1;
    const Customer_ID = req.session.user[0].Customer_ID;

    const Check_In = req.body.Check_In;
    const Check_Out = req.body.Check_Out;
    const Adult = req.body.Adult;
    const Child = req.body.Child;
    const Pay_Date = getFormatDate(date);
    const Pay_Type = req.body.Pay_Type;

    const sqlInsert2 = `INSERT INTO Reservation(Room_Num,Hotel_ID,Customer_ID,Price_Won,Check_In,Check_Out,Adult,Child,Pay_Date,Pay_Type) VALUES (?,?,${Customer_ID},?,?,?,?,?,?,?);`
    const sqlInsert1 = `SELECT Price_won FROM Room natural join Room_Type where Room_Num=(?)`
    {
        Room_Num.map((roomnum) => (
            db.query(
                sqlInsert1,
                roomnum,
                (err1, result1) => {
                    if (err1) {
                        console.log(err1);
                    }
                    else {
                        console.log(result1);
                        db.query(
                            sqlInsert2,
                            [roomnum, Hotel_ID, result1[0].Price_won * dateDiff(Check_In, Check_Out), Check_In, Check_Out, Adult, Child, Pay_Date, Pay_Type],
                            (err2, result2) => {
                                if (err2) {
                                    console.log(err2);
                                }
                                else {
                                    console.log(err2);
                                    console.log(result2);

                                }
                            }
                        )
                    }
                }
            )

        ))
    }
    res.send({ isok: true });



});


module.exports = router;
