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

const db= mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'hotal'
})

app.use(cors({
    origin : ["http://localhost:3000"],
    methods:["GET","POST"],
    credentials :true

}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    key:"userid",
    secret:"abc",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60 * 60 *24,
    },
}));


app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM clientInfo";
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });

});

// app.get('/',(req,res)=>{

//     const sqlInsert = "INSERT INTO clientInfo (email,password) VALUES ('msr56501354@gmail.com','1234'); "
//     db.query(sqlInsert, (err, result)=>{
//         res.send("helloworld");

//     })
   
// });
app.post('/signup', (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO client (firstName,lastName,email,password) VALUES (?,?,?,?);"
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err){
            console.log(err);
        }
        db.query( 
            sqlInsert,
            [firstName,lastName,email,hash],
            (err,result)=>{
                // console.log(firstName+""+lastName+""+email+" "+password);
                console.log(err);
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
    
    const email = req.body.email;
    const password = req.body.password;
    const sqlSelect = "SELECT * FROM client WHERE email = ?;"
    db.query(
        sqlSelect,
        email,
        (err,result)=>{
            if(err){
                res.send({err:err});
            }
            console.log(err);
            if(result>0){
               bcrypt.compare(password,result[0].password,(error,response)=>{
                   if(response){
                       req.session.user=result;
                       console.log(req.session.user);
                       res.send(result);
                   }else{
                    console.log("wrong email/password combination");
                    res.send({messages:"Wrong email/password combination"});
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