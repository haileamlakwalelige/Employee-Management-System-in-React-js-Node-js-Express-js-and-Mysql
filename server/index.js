const express = require("express");
const cors = require("cors");
const mysql = require('mysql');



const app = express();
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        port:"3307",
        database:"tasks",
});



con.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected Successfully");

});

app.get("/createdb", (req, res)=>{
    const sql = "CREATE DATABASE tasks";
    con.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        
        res.send("Database is Created Successfully!");
    })
})



app.get("/table",(req, res)=>{
    const createTableQuery = `
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  age INT(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  salary INT(255) NOT NULL,
  PRIMARY KEY (id)
)`;
con.query(createTableQuery, (err, result)=>{
    if(err){
        throw err;
    }
    
    res.send("Table Created Successfully");
});
});

app.post("/create", (req, res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    con.query("INSERT INTO users (full_name, age, country, position, salary) VALUES (?,?,?,?,?)",[name, age, country , position, salary] , (err, result)=>{
        if(err){
            throw err;
        }
        res.send("Data inserted Successfully");
    });
});

app.get("/show", (req, res)=>{
    const sql ="SELECT * FROM users";
    con.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    });
})


app.listen(5000, ()=>{
    console.log("Server Running in Port 5000!!")
})
