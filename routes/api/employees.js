const express=require('express');
const router=express.Router();
const employeeController=require('../../controllers/employeesController');
// const path=require('path');
const data={
    employees:require('../../models/employees.json'),
    setEmployees:function(data){this.employees=data}
};

router.route('/')
    .get(employeeController.getallEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports=router;