// console.log('testing');
const {format}=require('date-fns');
const {v4:uuid}=require('uuid');
const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');
const { app } = require('../server');
const logEvents=async(message,logName)=>{
    const dateTime=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem=`${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem);
    }
    catch(err){
        console.err(err);
    }
}
const logger=(req,res,next)=>{
    logEvents(`${req.method} ${req.headers.origin} ${req.url}`,'reqlog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}
module.exports={logger,logEvents};