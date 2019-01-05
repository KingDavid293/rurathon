const express  = require("express");
const app = express();
const bodyParser = require('body-parser');
const util = require('util');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var db = mongoose.connect('mongodb://kingping293:9tharun9@ds026658.mlab.com:26658/ruralvol');
var Org = require('./mongoDBSchema/organisation');
var Vol = require('./mongoDBSchema/volunteer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/addOrg", function(req,res,next){
    var org = new Org();
    var org_name = "req.org_name";
    var org_info = "info";
    var org_password = "qwerty";
    var org_emailID = "somthing@me.com";
    var org_uid = uuidv1();

    Org.find({org_UID : org_uid}, (err,found) => {
        if(err){
            console.log(err);
        } else {
            if(found.length == 0){
                org.org_Name = org_name;
                org.org_Info = org_info;
                org.org_Password = org_password;
                org.org_EmailId = org_emailID;
                org.org_UID = org_uid;

                org.save(function (err, savedUser){
                    if(err){
                      res.status(500).send(err);
                    } else {
                      res.status(200).send(savedUser);
                    }
                  });
            } else {
                res.send(found);
            }
        }
    })
})

app.post('/createEvent', (req,res) => {
    var org_uid = req.body.org_uid;
    var event_name = "primary education assistanc(hyd)";
    var event_discription = "primary education assistance,need volunteers to assist or educate primary school students";
    var event_time = "12-3-18 at 8AM";
    var event_duration = 1;
    var event_totalslots = 20;
    var event_uid = uuidv1();
    var event_loc_state = "qwerty";
    var event_loc_dist = "abcde";
    var event_loc_vill = "pnpx";
    var event_loc_pin = 556677;

    Org.find({org_UID : org_uid}, (err,found) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            if(found.length == 1){

                var event = {
                    event_Name : event_name,
                    event_Discription : event_discription,
                    event_Time : event_time,
                    event_Duration : event_duration,
                    event_TotalSlots : event_totalslots,
                    event_UID : event_uid,
                    event_Location : {
                        loc_State : event_loc_state,
                        loc_District : event_loc_dist,
                        loc_Village : event_loc_vill,
                        loc_PinCode : event_loc_pin,
                    }
                }

                // res.send(found[0].org_Events);

                found[0].org_Events.push(event);
                found[0].save(function (err, savedUser){
                    if(err){
                      res.status(500).send(err);
                    } else {
                      res.status(200).send(savedUser );
                    }
                  });
            } else {
                res.send(found);
            }
        }
    });
})

app.post('/login',(req,res) => {
    var loginEmail = req.body.vol_Login_emailId;
    var loginPassword = req.body.vol_Login_password;
    
    Vol.find({vol_EmailId : loginEmail}, (err, found) => {
        if(err){
            res.send(err);
        } else{
            if(found.length == 1){
                if(found[0].vol_Password == loginPassword){
                    const payload = {
                        vol_EmailId : found[0].vol_EmailId
                    };

                    var token = jwt.sign(payload,"qwerty");
                    var resData = {
                        "Token" : token,
                        "loginSuccess" : true
                    };
                    res.send(resData);
                } else {
                    res.send("wrong Password")
                }
            } else{
                res.send("user dosent exist");
            }
        }
    })
})

app.post('/getEvents',(req,res) => {

    Org.find({}, (err, found)=>{
        if(err){
            res.send("err")
        } else {
            if(found.length != 0){
                var eventsList = [];
                for(var i = 0; i < found.length; i++){
                    if(found[i].org_Events.length != 0){
                        for(var j = 0; j < found[i].org_Events.length ; j++){
                            eventsList.push(found[i].org_Events[j]);
                        }
                    }
                    if(i == found.length - 1){
                        var Data = {
                            "success" : true,
                            "Data" : eventsList
                        }
        
                        res.send(Data);
                    } 
                }
            } else {
                res.send("no Events Avalable")
            }
        }
    })
})


app.post('/getDiary',(req,res) => {
    auth(req, res);
    Vol.find({vol_EmailId : req.decoded.vol_EmailId}, (err, found)=>{
        if(err){
            res.send("err")
        } else {
            if(found.length != 0){
                var DATA = {
                    "success" : true,
                    "Data" : []
                }
                for(var b = 0; b < found[0].vol_Diary.length ; b ++){
                    var da = {
                        "event_Name" : found[0].vol_Diary[b].event_Name,
                        "vol_DiaryDate" : found[0].vol_Diary[b].vol_DiaryDate,
                        "vol_DiaryEntry" : found[0].vol_Diary[b].vol_DiaryEntry
                    }
                    DATA.Data.push(da);

                    if(b == found[0].vol_Diary.length - 1){
                        res.send(DATA);
                        break;
                    }
                }
            } else {
                res.send("no Diary Entry")
            }
        }
    })
})

//needs Work#######################################################

app.post('/registerForEvent', (req,res) =>{
    auth(req, res);
    
    res.send({"success": true})
})




app.post('/getActiveEvents', (req,res) =>{
        auth(req, res);
        
        Vol.find({vol_EmailId : req.decoded.vol_EmailId}, (err,found) => {
            if(err){
                res.send({ success: false, message: 'err' })
            } else {
                var activeEventsList = found[0].vol_ApprovedEvents;
                res.send({ success:true, Data: activeEventsList});
            }
        })
})

function auth(req, res) {

    // check header or url parameters or post parameters for token
    var token = req.body.token ;
    
    // decode token
    if (token) {
    
        // verifies secret and checks exp
        jwt.verify(token, "qwerty", function(err, decoded) {       
        if (err) {
            res.send({ success: false, message: 'Failed to authenticate token.' });       
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;         
        }
        });
    } else {

        // if there is no token
        // return an error
        res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        }
}

app.post('/VolSignUp',function(req,res,next){
    var vol_username = req.body.vol_username;
    var vol_password = req.body.vol_password;
    var vol_emailId = req.body.vol_emailId;
    var vol_name = req.body.vol_name;

    var vol = new Vol();

    Vol.find({vol_EmailId : vol_emailId}, (err,found) => {
        if(err){
            res.status(400).send("Error");
        } else {
            if(found.length == 0){
                vol.vol_UserName = vol_username;
                vol.vol_Password = vol_password;
                vol.vol_EmailId = vol_emailId;
                vol.vol_Name = vol_name;

                vol.save((err, savedData) =>{
                    if(err){
                        res.send(err);
                    } else {
                        res.send("account created");
                    }
                })
            } else {
                res.send("User Exists");
            }
        }
    })
})

app.get('/' ,(req,res) => {
    res.send("The Server is Working")
})



app.listen(3000, () => {
    console.log("server runnig at port 3000");
});