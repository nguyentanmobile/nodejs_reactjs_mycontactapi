var express = require("express");
var app  = express();
var userapi = require("./routers/api/userapi");
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.use("/api",userapi);
app.listen(port,function(){
    console.log("==============Server is Already==============");
})