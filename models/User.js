const mongoose=require('mongoose');
const { stringify } = require('uuid');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default:3
        },
        Editor:Number,
        Admin:Number
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String
});
module.exports=mongoose.model('User',UserSchema);