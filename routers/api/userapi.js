var express = require("express");

var multer = require("multer");
var fs = require("fs");
var router = express.Router();
var contact_mg = require("./../../mongoose_api/contact_mg");
router.get("/listuserapi",function(req,res){
    res.json({
        usercontent:{
            username:"andy",
            password:"123",
            imageurl:"/images/icontemplate.png",
            fullname:"ANDY",
            email:"hello@gmail.com",
            phone:"111-111",
            info:"abcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjgabcdefghsdfsdfgsfgdskfgjsdlkgjlkdsfjg",
        },
        error:"Can't connect to server. Please, login again" //null or error message
    });
})
router.post("/login",function(req,res){
    var body = req.body;
    console.log(body)
    contact_mg.readUser(body.username,body.password,function(err,doc){
        if(err==null){
            if(doc==null){
                res.json({
                    usercontent:null,
                    error:"Can't get data from database.Please Signup"
                })
            }else{
                res.json({
                    usercontent:doc,
                    error:null
                });
            }
        }else{
            res.json({
                usercontent:null,
                error:err
            });
        }
    })
    
})
router.post("/adduser",function(req,res){   
    
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images')
          },
          filename: function (req, file, callback) {
            callback(null, file.originalname );           
          }
    })
    var upload = multer({
        storage:storage
    }).any();
    upload(req,res,(err)=>{
        if(err){
            res.json({
                usercontent:null,
                error:err
            });
        }
        else{
            var imageurl ;
           // console.log(req.body);//is json object about text
            req.files.forEach(function(item) { //only file
                console.log(item);
                imageurl = "/images/"+item.filename;
                // move your file to destination
            });
            var user = req.body;
            contact_mg.createUser(user.userid,user.password,imageurl,user.fullname,user.email,user.phone,user.info,function(err){
                
                if(err){
                    res.json({
                        usercontent:null,
                        error:err
                    });
                }else{
                    
                    res.json({
                        userContent:{
                            userid:user.userid,
                            password:user.password,
                            imageurl:imageurl,
                            fullname:user.fullname,
                            email:user.email,
                            phone:user.phone,
                            info:user.info                           
                        },
                        error:null
                    });
                }
            });
            
            
        }
    })
    /*var form = new multiparty.Form();
    let fs = require('fs');
    form.on('field',function(name,value){
        console.log(name)
        if(name ==='userid'){
            console.log(value);
        }
    })
    form.parse(req);
    /*
    form.parse(req,(err,fields,files)=>{
        Object.keys(fields).forEach(function(name,index) {
            console.log('got field named ' + name);
            console.log(fields[index])
          });
         
          Object.keys(files).forEach(function(name,index) {
            console.log('got file named ' + name);
            console.log(files[index])
          });
          
    });
   
    contact_mg.createUser(body.username,body.password,body.imageurl,body.fullname,body.email,body.phone,body.info,function(err){
        if(err) {
            res.json({
                usercontent:"error",
                error:err
            });
        }else{
            res.json({
                usercontent:"success",
                error:null
            });
        }
    });
    */
});
module.exports = router;
