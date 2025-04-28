const Employee=require('../models/Employee');

// const fsPromises=require('fs').promises;
const getallEmployees=async (req,res)=>{
    const employees=await Employee.find();
    if(!employees) return res.status(204).json({'message':"No employees"});
    res.json(employees);
}
const createNewEmployee=async (req,res)=>{
    // const newEmployee={
    //     id:data.employees?.length?data.employees[data.employees.length-1].id+1:1,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname
    // }
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({'message':'First and last names are required'});
    }

    try{
        const result =await Employee.create({
            'firstname':req.body.firstname,
            'lastname':req.body.lastname
        });
        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
    // if(!newEmployee.firstname || !newEmployee.lastname){
    //     res.status(400).send("First name and last name are compulsory");
    // }
    // data.setEmployees([...data.employees,newEmployee]);
    // res.status(201).json(newEmployee);
    // try{
    //     await fsPromises.appendFile(
    //                 path.join(__dirname,'..','models','employees.json'),
    //                 JSON.stringify(data.employees)
    //     );
    // }catch(err){
    //     console.err(err);
    // }
}
const updateEmployee=async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message':'Enter the correct id:'});
    }
    const employee=await Employee.findOne({_id:req.body.id}).exec();
    if(!employee){
        res.status(204).json({"message":`No employee matches ${req.body.id}`});
    }
    if(req.body?.firstname) employee.firstname=req.body.firstname;
    if(req.body?.lastname) employee.lastname=req.body.lastname;
    const result=await employee.save();
    // const filteredArray=data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    // const unsortedArray=[...filteredArray,employee];
    // data.setEmployees=(unsortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0));
    res.json(result);
}

const deleteEmployee=async (req,res)=>{
    // const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!req?.body?.id) return res.status(400).json({'message':'Enter the correct id:'});
    const employee=await Employee.findOne({_id:req.body.id}).exec();
    if(!employee){
        res.status(204).json({"message":`No employee matches ${req.body.id}`});
    }
    const result = await Employee.deleteOne({_id:req.body.id});
    res.json(result);
}
const getEmployee=async (req,res)=>{
    // const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!req?.params?.id){
        return res.status(400).json({'message':'Enter the correct id:'});
    }  
    const employee=await Employee.findOne({_id:req.params.id}).exec();
    if(!employee){
        res.status(204).json({"message":`No employee matches ${req.params.id}`});
        }
    res.json(employee);
}
module.exports={
    getallEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee
};