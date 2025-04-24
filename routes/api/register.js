const express=require('express');
const router=express.Router();
const {handlenewUser}=require('../../controllers/registerController');

router.post('/',handlenewUser);

module.exports=router;