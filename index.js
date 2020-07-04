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

app.listen(7000,()=>console.log('Express server is running at port no:3000'));
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

//insert into employee static way
var sql = "INSERT INTO Employee (EmpId, EmpName, EmpAge, EmpSalary) VALUES ('3', 'Ajeet Kumar', '27', '45000')";  
mysqlConnection.query(sql, function (err, result) {  
if (err) throw err;  
console.log("1 record inserted");  
});  


//insert  post method
app.post("/employeesinsert",(req,res)=>{

    const EmpId =req.body.EmpId;
    const EmpName=req.body.EmpName;
    const EmpAge=req.body.EmpAge;
    const EmpSalary=req.body.EmpSalary;

    mysqlConnection.query("INSERT INTO Employee VALUES(?,?,?,?)",[EmpId,EmpName,EmpAge,EmpSalary],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log("Created Sucessfully...");
        }
        else{
            console.log(err);
        }
    })
});


//update into employee
var sql = "UPDATE Employee SET EmpName = 'prachi' WHERE EmpName = 'Ajeet Kumar'";  
mysqlConnection.query(sql, function (err, result) {  
if (err) throw err;  
console.log(result.affectedRows + " record(s) updated");  
});  


//update post method 
app.post("/employeesupdate",(req,res)=>{

    const EmpId =req.body.EmpId;
    const EmpName=req.body.EmpName;
    const EmpAge=req.body.EmpAge;
    const EmpSalary=req.body.EmpSalary;

    mysqlConnection.query("UPDATE  Employee SET EmpSalary=? WHERE  EmpSalary=?",[234500,EmpSalary],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            console.log("Updated  Sucessfully...");
        }
        else{
            console.log(err);
        }
    })
});