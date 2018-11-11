const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3001
const mongoose = require('mongoose');
let uri = 'mongodb://user:mmineejuta27@ds157843.mlab.com:57843/user';
           

let UserSchema = mongoose.Schema({
    email: String,
    password: String,
  });
let user = mongoose.model('user', UserSchema);


let checkSchema = mongoose.Schema({
    email:String,
    time: String,
});
let time = mongoose.model('check',checkSchema);
var d = new Date()

mongoose.connect(uri);
let db = mongoose.connection;

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send("Hello world")
})

app.post('/register',(req,res) => {
    console.log("passregis")
    console.log(req.body.email)
    console.log(req.body.password)
    user.find({ email: req.body.email}).exec().then(doc =>{
        if (doc.length >= 1 ){
           return res.status(409).json({
            message: "Mail exists",
            success: false
        }); 
        }else{
            if (req.body.password != req.body.password2){
                return res.status(409).json({
                    message: "Check password",
                    success: false
                }); 
            }else{
                let insert1 = new user({
                    email: req.body.email,
                    password: req.body.password,
                });
                user.insertMany(insert1).then(() =>{

                })

                return res.status(200).json({
                    message: "Ok",
                    success: true
                });
            }
        }
    }).catch(err => {
        console.log(err);
    })
})

app.post('/login',(req,res) => {
    user.find({ email: req.body.email,password: req.body.password}).exec().then(doc =>{
        if (doc.length <1 ){
            return res.status(409).json({
                message: "Wrong",
                success: false
            }); 
        }else{
            console.log(d)
            let insert2 = new time({
                email: req.body.email,
                time: d
            });
            time.insertMany(insert2).then(() => {

            })
            return res.status(200).json({
                message: req.body.email,
                success: true
            });
        }
    })
})

app.post('/loginf',(req,res) => {
            console.log(d)
            let insert2 = new time({
                email: req.body.email,
                time: d
            });
            time.insertMany(insert2).then(() => {

            })
            return res.status(200).json({
                message: req.body.email,
                success: true
            });
})

app.post('/time',(req,res) => {
    console.log(req.body.email)
    time.find({email: req.body.email}).select("time").then(doc =>{
        console.log(doc)
        
        res.status(200).json({
            user: doc
        })
    })
})














app.listen( port ,() => console.log(`App running ${port}`))