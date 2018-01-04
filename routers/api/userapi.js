var express = require("express");
var router = express.Router();
router.get("/user",function(req,res){
    res.json({
        message:"user"
    });
})
module.exports = router;