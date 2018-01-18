var express = require("express");
var path = require("path");
var body_parser = require("body-parser");
var app  = express();
var contact_mg = require("./mongoose_api/contact_mg");
var userapi = require("./routers/api/userapi");
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

contact_mg.connect("mongodb://admin:123456@ds161336.mlab.com:61336/mycontacts",function(err){
    if(err){
        console.log("error connect mongo data");
        throw err;
    }else{
        console.log("=========== Mongodb connected successfull =============");
    }
})
app.use(express.static(path.join(__dirname,"./public")));
app.use(function (req, res, next) { 

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use("/user",userapi);

app.listen(port,function(){
    console.log("==============Server is Already==============");
})