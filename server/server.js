const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT ||5000;
const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db= mysql.createConnection({
    
        "host": "110.13.222.97",
        "user": "ooioo",
        "password": "1234",
        "port": "13333",
        "database": "sonson"
      
      
});

app.use(cors({
    origin : ["http://localhost:3000"],
    methods:["GET","POST"],
    credentials :true

}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    key:"user",
    secret:"abc",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60 * 60 *24,
    },
}));


// app.get('/api/get',(req,res)=>{
//     const sqlSelect = "SELECT * FROM clientInfo";
//     db.query(sqlSelect, (err,result)=>{
//         res.send(result);
//     });

// });

// app.get('/',(req,res)=>{

//     const sqlInsert = "INSERT INTO clientInfo (E_Mail,Login_PW) VALUES ('msr56501354@gmail.com','1234'); "
//     db.query(sqlInsert, (err, result)=>{
//         res.send("helloworld");

//     })
   
// });
app.post('/signup', (req,res)=>{
    const Login_ID = req.body.Login_ID;
    const Login_PW = req.body.Login_PW;
    const passwordcheck = req.body.passwordcheck;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const E_Mail = req.body.E_Mail;
    const Phone_Number = req.body.Phone_Number;
    const Zip = req.body.Zip; //우편번호
    const Apt_Num =req.body.Apt_Num; //상세주소
    const Fax = req.body.Fax;//팩스번호
    const Rank = 'red';
    const Validity_Month= 3;
    const Mileage = 1;
    const Reg_Date='2020-11-20';
    const Membership_Due_Date='2020-11-20';
    const Nationality = req.body.Nationality;
    const Birthday= req.body.Birthday;
   const Gender = req.body.Gender;
    let count;
    const get = "SELECT COUNT (Inform_ID) as cnt FROM Information;"

    db.query(
        get,
        (err,result)=>{
            count = result[0].cnt;
            console.log(result);

            console.log("aaa " + count);
            // console.log("bbb " + count);
            const sqlInsert = "INSERT INTO Customer (Login_ID,Login_PW,Inform_ID,Rank,Validity_Month,Mileage,Reg_Date,Membership_Due_Date) VALUES (?,?,'" + (count+1) + "',?,?,?,?,?);"
            // console.log("ccc " + count);
            const sqlInsert2 = "INSERT INTO Information(First_Name,Last_Name,Inform_ID,E_Mail,Phone_Number,Zip,Apt_Num,Fax,Nationality,Birthday,Gender) VALUES (?,?,'" + (count+1) + "',?,?,32164,?,?,?,?,?);"
            
            
            bcrypt.hash(Login_PW,saltRounds,(err,hash)=>{
                if(err){
                    console.log(err);
                }        
                // console.log(hash);
                db.query(
                    sqlInsert2,
                    [First_Name,Last_Name,E_Mail,Phone_Number,Apt_Num,Fax,Nationality,Birthday,Gender],
                    (err,result)=>{
                        // console.log(First_Name+""+Last_Name+""+E_Mail+" "+Login_PW);
                        console.log(err);
                    });
                db.query( 
                    sqlInsert,
                    [Login_ID,hash,Rank,Validity_Month,Mileage,Reg_Date,Membership_Due_Date],
                    (err,result)=>{
                        // console.log(First_Name+""+Last_Name+""+E_Mail+" "+Login_PW);
                        console.log(err);
                    });
                
            });

        });
    



   
});

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user});
    }else{
        res.send({loggedIn:false});
    }
});

app.post("/login",(req,res)=>{
    
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
            // console.log(result);
            // console.log(result[0].Login_PW);
            // console.log(Login_PW);

            if(result.length > 0){
               bcrypt.compare(Login_PW,result[0].Login_PW,function(error,response){
                   if(response){
                       req.session.user=result;
                       console.log(req.session.user);
                       res.send(result);
                   }else{
                    console.log("wrong Login_ID/Login_PW combination");
                    res.send({messages:"Wrong Login_ID/Login_PW combination"});
                   }
               });            
            }else{
                console.log("User doesn't exist");
                res.send({messages:"User doesn't exist"});
            }
        }
    );
});


app.listen(port,()=> console.log(`listening on port ${port}`));