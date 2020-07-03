const mysql =require('mysql');
const express = require('express');
var app = express();
const bodyparser =require('body-parser');

app.use(bodyparser.json());


var mysqlConnection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"123",
    database:"nodedb"
});

mysqlConnection.connect((err) => {
    if(!err)
       console.log("DB connection Successfull");
    else
      console.log("DB connection Failed \n Error"+JSON.stringify(err,undefined,2));

});

app.listen(3000,()=>console.log('Express server is running at port no:3000'));

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
        if(!err)
        //console.log(rows);
        res.send(rows);
        else
        console.log(err);
    })
});
//get an employee according to name 
app.get('/employees/:age',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpAge=?'[req.params.age],(err,rows,fields)=>{
        if(!err)
        //console.log(rows);
        res.send(rows);
        else
        console.log(err);
    })
});