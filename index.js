const mysql =require('mysql');
const express = require('express');
var app = express();
const bodyparser =require('body-parser');

app.use(bodyparser.json());


var mysqlConnection =mysql.createConnection({
    host:'localhost',
    user:'sakshi',
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
//select all employee values
app.get('/employees',(req,res)=>{
    console.log(req.params);
    mysqlConnection.query('SELECT * FROM Employee',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//select an employee according to id
app.get('/employees/:id',(req,res)=>{
    console.log(req.params);
    mysqlConnection.query('SELECT * FROM Employee WHERE  EmpId=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


//delete an employee
app.delete('/employees/:id',(req,res)=>{
    console.log(req.params);
    mysqlConnection.query('DELETE  FROM  Employee WHERE  EmpId=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted Sucessfully ...');
        else
        console.log(err);
    })
});

//insert into employee
var sql = "INSERT INTO Employee (EmpId, EmpName, EmpAge, EmpSalary) VALUES ('3', 'Ajeet Kumar', '27', '45000')";  
mysqlConnection.query(sql, function (err, result) {  
if (err) throw err;  
console.log("1 record inserted");  
});  




//update into employee
var sql = "UPDATE Employee SET EmpName = 'prachi' WHERE EmpName = 'Ajeet Kumar'";  
mysqlConnection.query(sql, function (err, result) {  
if (err) throw err;  
console.log(result.affectedRows + " record(s) updated");  
});  