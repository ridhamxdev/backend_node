const express=require('express');
const router=express.Router();
const path=require('path');
router.get('/',(req,res)=>{
    // res.sendFile('/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});
router.get('/index',(req,res)=>{
    // res.sendFile('/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

module.exports=router;