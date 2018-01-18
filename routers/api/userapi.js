var express = require("express");
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
    var body = req.body;
    console.log(body);
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
});
module.exports = router;
