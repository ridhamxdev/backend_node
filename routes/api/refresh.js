const express=require('express');
const router=express.Router();
// const authController=require('../../controllers/authController');
const refreshTokenController= require('../../controllers/refreshTokenController');

router.get('/',refreshTokenController.handleRefreshToken);

module.exports=router;