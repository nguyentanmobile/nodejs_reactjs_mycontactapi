var mongoose =require("mongoose");

mongoose.Promise = global.Promise;
var Schema =mongoose.Schema;
var MyContactSchema = new Schema({
    userid:String,
    password:String,
    imageurl:String,
    fullname:String,
    email:String,
    phone:String,
    info:String
})
exports.connect = function(dbURL,callback){
    mongoose.connect(dbURL);
    callback();
}
exports.disconnect = function(callback){
    mongoose.disconnect(callback);
}
mongoose.model("user",MyContactSchema);
var User = mongoose.model("user"); 
exports.createUser = function(username,password,imageurl,fullname,email,phone,info,callback){
    var user = new User();
    user.userid = username;
    user.password = password;
    user.imageurl = imageurl;
    user.fullname = fullname;
    user.email = email;
    user.phone = phone;
    user.info = info;
    user.save(function(err){
        if(err) callback(err);
        else callback();
    })
}
exports.readUser = function(username,password,callback){
    User.findOne({userid:username,password:password},function(err,doc){       
        
        if(err) callback(err);
        else callback(null,doc);
    });
}
exports.updateUser =function(username,password,imageurl,fullname,email,phone,info,callback){
    exports.readUser(username,password,function(err,doc){
        if(err)callback(err);
        else{

            doc.userid = username;
            doc.password = password;
            if(imageurl!=""){
                doc.imageurl = imageurl;
            }
            doc.fullname = fullname;
            doc.email = email;
            doc.phone = phone;
            doc.info = info;
            doc.save(function(err){
                if(err) callback(err);
                else callback(null,doc);
            })
        }
    })
}
