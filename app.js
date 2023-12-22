import  express  from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
//import data from './date.js';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

let userLogin=false;
let abc="";
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
  
    res.render(__dirname+"/views/home.ejs",{userLogin,user:abc});
   });

app.post('/login', (req, res) => {
    const { username,email, password} = req.body;


    User.findOne({ email ,password})
      .then(user => {
        if (user) {
          console.log(user);
          console.log('Login successful!');
          User.find({email},{_id:0,username:1})
          .then(user =>{
           
              res.render(__dirname+"/views/home.ejs" ,{user,userLogin:true});
            console.log("login");
              console.log(userLogin);
            
            console.log(abc);
            return userLogin = true, abc=user;
            })
    
        } else {
          console.log('Invalid credentials');
        }

      })
   
  });
  app.post("/register-page",(req,res)=>{
    res.render(__dirname+"/views/register.ejs",{userLogin:false, message: null});
   });

  app.post('/register', (req, res) => {
    const { username,email, password, confirmPassword} = req.body;
  //res.render(__dirname+"/views/register.ejs",{userLogin:false, message: null});
  if (password !== confirmPassword) {
    res.render(__dirname+"/views/register.ejs", {userLogin:false, message: 'Password and Confirm Password do not match!' });
    return console.log('Password and Confirm Password must match.');
  }
  

    // Check if the username is already taken
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          //res.send('Username already exists. Please choose a different username.');
          res.render(__dirname+"/views/register.ejs", {userLogin:false, message: 'Username already exists. Please choose a different username.' });
          console.log("Username already exists. Please choose a different username.");
        } else {
          // Create a new user
          console.log("new user created");
          res.render(__dirname+"/views/register.ejs", {userLogin:false, message: 'new user created' });
          return User.create({ username,email, password});
          
        }
      });

      
      
      
  });  
  app.post("/signout", (req, res) => {
    res.redirect("/");
    return userLogin=false;
   });

   app.get("/shop",(req,res)=>{
    console.log("shop");
    console.log(userLogin);
    console.log(abc);
    res.render(__dirname+"/views/shop.ejs",{userLogin,user:abc});
  });

  app.get("/review",(req,res)=>{
   // console.log(user);
    res.render(__dirname+"/views/review.ejs",{userLogin,user:abc});
  });
  app.get("/about",(req,res)=>{
   // console.log(user);
    res.render(__dirname+"/views/about.ejs",{userLogin,user:abc});
  }); 
  app.get("/blog",(req,res)=>{
   // console.log(user);
    res.render(__dirname+"/views/blog.ejs",{userLogin,user:abc});
  });
  app.get("/contact",(req,res)=>{
    console.log("contact");
    res.render(__dirname+"/views/contact.ejs",{userLogin,user:abc});
  });
  
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${port}`);
}); 
  