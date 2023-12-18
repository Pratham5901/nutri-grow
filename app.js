import  express  from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

let user=false;

const app=express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL);

const userSchema = new mongoose.Schema({
  username: String,
  email:String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get("/", (req, res) => {
  
    res.render(__dirname+"/views/home.ejs",{user:false});
   });

app.post('/login', (req, res) => {
    const { username,email, password} = req.body;


    User.findOne({ email ,password})
      .then(user => {
        if (user) {
          
          console.log('Login successful!');
          User.find({email},{_id:0,username:1})
          .then(users =>{
         
              res.render(__dirname+"/views/home.ejs" ,{user:true,users});
            
            })
    
        } else {
          console.log('Invalid credentials');
        }

      })
   
  });
   

  app.post('/register', (req, res) => {
    const { username,email, password, confirmPassword} = req.body;
  res.render(__dirname+"/views/register.ejs");

  if (password !== confirmPassword) {
    return console.log('Password and Confirm Password must match.');
  }

    // Check if the username is already taken
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          //res.send('Username already exists. Please choose a different username.');
          console.log("Username already exists. Please choose a different username.");
        } else {
          // Create a new user
          console.log("new user created");
          
          return User.create({ username,email, password});
          
        }
      });
     
      
      
  });  
  app.post("/signout", (req, res) => {
    res.redirect("/");
   });

   app.get("/shop",(req,res)=>{
    console.log(user);
    res.render(__dirname+"/views/shop.ejs",{user:false});
  });
  app.get("/review",(req,res)=>{
    console.log(user);
    res.render(__dirname+"/views/review.ejs",{user:false});
  });
  app.get("/about",(req,res)=>{
    console.log(user);
    res.render(__dirname+"/views/about.ejs",{user:false});
  }); 
  app.get("/blog",(req,res)=>{
    console.log(user);
    res.render(__dirname+"/views/blog.ejs",{user:false});
  });
  app.get("/contact",(req,res)=>{
    console.log(user);
    res.render(__dirname+"/views/contact.ejs",{user:false});
  });
  
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${port}`);
}); 
  