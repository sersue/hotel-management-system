const express =require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ||5000;
const mysql = require('mysql');
const cors= require('cors')

const db= mysql.createPool({

    host: '127.0.0.1',
    user: 'root',
    password: 'anstnfla25',
    database: 'HOTELDataBase'



})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

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
app.post('/api/insert', (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO clientInfo (email,password) VALUES (?,?);"
    db.query(sqlInsert, [email,password], (err,result)=>{
        console.log(result);
    });
});

app.listen(port,()=> console.log(`listening on port ${port}`));