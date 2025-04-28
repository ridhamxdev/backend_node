const User=require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken =  async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken=cookies.jwt;


    const foundUser =await User.findOne({refreshToken}).exec();
    if(!foundUser){
        return res.sendStatus(403);
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken=jwt.sign(
                {"UserInfo":{
                    "username":decoded.username,
                    "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'50s'}
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