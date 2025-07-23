require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
 const connection = mysql.createConnection(
    {
        port:process.env.PORT,
        host:process.env.HOST,
        password:process.env.PASSWORD,
        user:process.env.USER,
        database :process.env.DATABASE
    }
 )
app.get("/currency/:c1/:c2",(req, res)=>{
     
    let {c1,c2} = req.params;
    c1 = c1.toUpperCase();
    c2 = c2.toUpperCase();

    if(c1 == c2 || c2 == 'USD'){
        connection.query(`SELECT Rate FROM currencyData WHERE Currency = (?)`,[c1], (err, result1)=>{
          res.send({"value": (1/result1[0]["Rate"])});
        });  
    }
    else{
         connection.query(`SELECT Rate FROM currencyData WHERE Currency = (?)`,[c1], (err, result1)=>{
            connection.query(`SELECT Rate FROM currencyData WHERE Currency = (?)`,[c2], (err, result2)=>{ 
                res.send( {"value":(result1[0]["Rate"]/result2[0]["Rate"])})
             });
         });   
    }

});

module.exports = app;


   
