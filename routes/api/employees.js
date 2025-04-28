const express=require('express');
const router=express.Router();
const employeeController=require('../../controllers/employeesController');
// const path=require('path');
const ROLES_LIST=require('../../config/roles_list');
const verifyRoles=require('../../middleware/verifyRoles');
const data={
    employees:require('../../models/employees.json'),
    setEmployees:function(data){this.employees=data}
};

router.route('/')
    .get(employeeController.getallEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports=router;