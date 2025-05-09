// const usersDB = {
//     users: require('../models/users.json'),
//     setUsers: function (data) { this.users = data }
// }

const User=require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const fsPromises = require('fs').promises;
// const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are compulsory' });
    const foundUser = await User.findOne({username:user}).exec();
    if (!foundUser) {
        return res.sendStatus(401);
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        //create JWT
        const accessToken = jwt.sign(
            {
                "Userinfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { 'expiresIn': '50s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { 'expiresIn': '1d' }
        );
        foundUser.refreshToken=refreshToken;
        const result=await foundUser.save();
        console.log(result);    
        // const otherUsers = usersDB.users.filter(person => person.usename !== foundUser.username);
        // const currentUser = { ...foundUser, refreshToken };
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'models', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )
        res.cookie('jwt', refreshToken, { httpOnly: true,samesite:'None',secure:'true', maxage: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}
module.exports = { handleLogin };