const data={
    employees:require('../models/employees.json'),
    setEmployees:function(data){this.employees=data}
};
const fsPromises=require('fs').promises;
const getallEmployees=(req,res)=>{
    res.json(data.employees);
}
const createNewEmployee=async (req,res)=>{
    const newEmployee={
        id:data.employees?.length?data.employees[data.employees.length-1].id+1:1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        res.status(400).send("First name and last name are compulsory");
    }
    data.setEmployees([...data.employees,newEmployee]);
    res.status(201).json(newEmployee);
    // try{
    //     await fsPromises.appendFile(
    //                 path.join(__dirname,'..','models','employees.json'),
    //                 JSON.stringify(data.employees)
    //     );
    // }catch(err){
    //     console.err(err);
    // }
}
const updateEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee){
        res.status(400).json({"message":`Employee id ${req.body.id} not found`});
    }
    if(req.body.firstname) employee.firstname=req.body.firstname;
    if(req.body.lastname) employee.lastname=req.body.lastname;
    const filteredArray=data.employees.filter(emp=>emp.id !== parseInt(req.body.id));
    const unsortedArray=[...filteredArray,employee];
    data.setEmployees=(unsortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0));
    res.json(data.employees);
}

const deleteEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee){
        res.status(400).json({"message":`Employee id ${req.body.id} not found`});
    }
    const filteredArray=data.employees.filter(emp=>emp.id !==parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}
const getEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id));
    if(!employee){
        res.status(400).json({"message":`Employee id ${req.body.id} not found`});
    }
    res.json(employee);
}
module.exports={
    getallEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee
};