require('dotenv').config();
const path=require('path');
const express=require('express');
const app=express();
// exports.app = app;
const cors=require('cors');
const cookieParser=require('cookie-parser');
const morgan = require('morgan')
const router=require('./routes/api/register.js')
const corsOptions=require('./config/corsOptions.js');
const { logger }=require('./middleware/logEvents.js');
const errorHandle=require('./middleware/errorhandler.js');
const verifyJWT=require('./middleware/verifyJWT.js');
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn.js');
const PORT=process.env.PORT;

connectDB();
app.use(cookieParser());
app.use(logger);
app.use(morgan('dev'))
app.use(cors(corsOptions));//Cross origin resource sharing

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'/public')));
// app.use('/subdir',express.static(path.join(__dirname,'/public')));



app.use('/',require('./routes/root.js'));
app.use('/register',require('./routes/api/register.js'));
app.use('/auth',require('./routes/api/auth.js'));
app.use('/refresh',require('./routes/api/refresh.js'));
app.use('/logout',require('./routes/api/logout.js'));
// app.use('/subdir',require('./routes/subdir.js'));
app.use(verifyJWT);
app.use('/employees',require('./routes/api/employees.js'));



app.all('*$',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:"404 not found"});
    }else{
        res.type('text').send("404 not found");
    }
});


app.use(errorHandle);

mongoose.connection.once('open',()=>{
    console.log("MongoDB connected");
    app.listen(PORT,()=>{
        console.log(`Server started on PORT ${PORT}`);
    })
})












// app.get('/hello',(req,res,next)=>{
//     console.log("Attempted to load hello.html");
//     next()
// },(req,res)=>{
//     res.send("Hello From hello.txt");
// });

// const one=(req,res,next)=>{
//     console.log("one");
//     next();
// }
// const two=(req,res,next)=>{
//     console.log("two");
//     next();
// }
// const three=(req,res)=>{
//     console.log("three");
//     res.end("Finished!");
// }
// app.get('/chain',[one,two,three]);

// const os = require('os');
// const path =require('path');
// const math=require('./math');
// // const temp=require('./temp.txt');
// const fsPromises=require('fs').promises;

// const fileops=async()=>{
    //     try{
        //         const data =await fsPromises.readFile(path.join(__dirname,'files','temp.txt'),'utf-8');
        //         console.log(data);
        //         await fsPromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\nNice to meet you');
        //         await fsPromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\nHello');
        //         await fsPromises.rename((path.join(__dirname,'files','promiseWrite.txt')),path.join((__dirname,'files','PromiseComplete.txt')));
        //         const newdata =await fsPromises.readFile(path.join(__dirname,'files','PromiseComplete.txt'),'utf-8');
        //         console.log(newdata);
        //     }catch (err){
            //         console.error(err);
            //     }
            // }
            // fileops();
            // // console.log(math.add(2,3));
            
            // // fs.readFile(path.join(__dirname,'files','temp.txt'),'utf-8',(err,data)=>{
                // //     if (err) throw err
                // //     console.log(data);
                // // })
                // // console.log("hello ....")
                // // fs.readFile('./hello.txt','utf-8',(err,data)=>{
                    // //     if (err) throw err
                    // //     console.log(data);
                    // // })
                    // // fs.writeFile(path.join(__dirname,'files','reply.txt'),"My name is Ridham",(err)=>{
                        // //     console.log("Writting Complete");
                        // //     fs.appendFile(path.join(__dirname,'files','reply.txt'),"\n\n Hello",(err)=>{
// //         console.log("Appending Complete");
// //         fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt'),(err)=>{
// //             console.log("Rename Completed");
// //         })
// //     })
// // })

// process.on('uncaughtException',err=>{
//     console.error(`There was an uncaught exception error ${err}`);
//     process.exit(1);
    
// })
// // console.log(os.version());
// // console.log(os.type());
// // console.log(os.homedir());
// // console.log(__dirname);
// // console.log(__filename);
// // console.log(path.dirname(__filename));
// // console.log(path.basename(__filename));
// // console.log(path.extname(__filename));
// // console.log(path.parse(__filename));