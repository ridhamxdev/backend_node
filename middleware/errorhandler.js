const {logEvents}=require('./logEvents');

const errorHandle=(err,req,res,next)=>{
    logEvents(`${err.name} ${err.message}`,'errorLog.txt');
    console.error(err.stack);
    res.sendStatus(500).send(err.message);
}
module.exports=errorHandle;