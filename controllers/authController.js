const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt=require('jsonwebtoken');
require('dotenv').config();
const fsPromises=require('fs').promises;
const path=require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const{user,pwd}=req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are compulsory' });
    const foundUser=usersDB.users.find(person=>person.username === user);
    if(!foundUser){
        return res.sendStatus(401);
    }
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        //create JWT
        const accessToken=jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {'expiresIn':'30s'}
        );
        const refreshToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {'expiresIn':'1d'}
        );
        const otherUsers=usersDB.users.filter(person=>person.usename !==foundUser.username);
        const currentUser={...foundUser,refreshToken};
        usersDB.setUsers([...otherUsers,currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,maxage:24*60*60*1000});
        res.json({accessToken});
    }else{
        res.sendStatus(401);
    }
}
module.exports={handleLogin};