// const usersDB = {
//     users: require('../models/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises=require('fs').promises;
// const path=require('path');
const User=require('../models/User');
const bcrypt=require('bcrypt');
const { json } = require('body-parser');

const handlenewUser=async(req,res)=>{
    console.log(req.body);
    const { user,pwd }=req.body;
    if(!user || !pwd) 
        return res.status(400).json({'message':'Username and Password are compulsory'});
    const duplicate=await User.findOne({username:user}).exec();
    if(duplicate) 
        return res.sendStatus(409);
    try{
        const hashpwd=await bcrypt.hash(pwd,10);
        const result=await User.create({
            "username":user,
            // "roles":{"User":2001},
            "password":hashpwd
        });
        console.log(result);
        // usersDB.setUsers([...usersDB.users,newuser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname,'..','models','users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        // console.log(usersDB.users);
        res.status(201).json({"message":`New user ${user} created`});
    }catch(err){
        res.status(500).json({"message":"Error message"});
    }
}
module.exports={handlenewUser};