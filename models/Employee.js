const mongoose=require('mongoose');
const { stringify } = require('uuid');
const Schema=mongoose.Schema;

const EmployeeSchema=new Schema({
    firstname:{
        type:string,
        required:true
    },
    lastname:{
        type:string,
        required:true
    }
});
module.exports=mongoose.model('Employee',EmployeeSchema);