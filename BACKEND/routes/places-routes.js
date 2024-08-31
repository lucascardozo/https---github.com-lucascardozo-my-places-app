const express = require('express');

const router = express.Router(); 

router.get("/",(req,res,next)=>{

    console.log("GET IN PLACES");

    res.json({
        message:"its work!"
    });
});

module.exports = router;