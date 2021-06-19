const express = require('express');
const mysql =require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "root",
    port:"8080",
    database: "baza",
})

app.post("/create", (req,res)=>{
    const title = req.body.title;
    const post_text = req.body.post_text;

     db.query("INSERT INTO posts (title,post_text) VALUES (?,?);",[title,post_text],(err,result)=>{
     });
})

app.get("/get", (req,res)=>{
     db.query("SELECT * FROM baza.posts",(err,result)=>{
         if(err){   
        console.log(err);
         }
         res.send(result);
     });
})

app.get("/getId/:id", (req,res)=>{
    const id=req.params.id;
    db.query("SELECT * FROM baza.posts WHERE id=?",id,(err,result)=>{
        if(err){   
       console.log(err);
        }
        res.send(result);
    });
})

app.post("/register", (req,res)=>{

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const InsertSql= "INSERT INTO user_reg (username,email,password) VALUES (?,?,?);"
    db.query(InsertSql,[username,email,password],(err,result)=>{
        console.log(err);
    });
    
});

app.post("/like/:id", (req,res)=>{
    const id = req.params.id;
    const InsertSql= "UPDATE posts SET likes = likes + 1 WHERE id=?;"
    db.query(InsertSql,id,(err,result)=>{
        console.log(err);
    });
    
});

app.post("/disLike/:id", (req,res)=>{
    const id = req.params.id;
    const InsertSql= "UPDATE posts SET likes = likes - 1 WHERE id=?;"
    db.query(InsertSql,id,(err,result)=>{
        console.log(err);
    });
    
});


app.post("/login", (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const InsertSql= "SELECT * FROM baza.user_reg WHERE email=? AND password=?;"
    db.query(InsertSql,[email,password],(err,result)=>{
        if(err){

            res.send({err:err});
        }
        if(result.length>0){
            res.send(result);
        } else{
            res.send({message:"User with that email/password does not exist"});
        }
    });
})



app.listen(3001, () =>{
    console.log("Server runing on port 3001");
});