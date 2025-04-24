const express=require('express');
const router=express.Router();
// const authController=require('../../controllers/authController');
const logoutController= require('../../controllers/logoutController');

router.get('/',logoutController.handleLogout);

module.exports=router;