const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken =  async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken=cookies.jwt;


    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser){
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken=jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            );
            res.json({accessToken});
        }
    );
    // if (!foundUser) {
    //     res.clearCookie('jwt',{httpOnly:true});
    //     return res.sendStatus(204);
    // }
    // const otherUsers=usersDB.users.filter(person=>person.refreshToken !== foundUser.refreshToken);
    // const currentUser={...foundUser,refreshToken:''};
    // usersDB.setUsers({...otherUsers,currentUser});
    // await fsPromises.writeFile(
    //     path.join(__dirname,'..','model','users.json'),
    //     JSON.stringify(usersDB.users)
    // );
    // res.clearCookie('jwt',{httpOnly:true});
    // res,sendStatus(204);
}
module.exports = { handleRefreshToken };