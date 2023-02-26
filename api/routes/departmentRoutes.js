const express = require('express');
const routes = express.Router();
const departmentController = require("../services/department.service");
const auth = require("../middleware/auth");

routes.post('/add',auth, departmentController.createDepartment);
routes.get('/get',auth, departmentController.getDepartment);
routes.put('/update/:deptId',auth, departmentController.updateDepartment);
routes.delete('/delete/:deptId',auth, departmentController.deleteDepartment);
routes.get('/get/:deptId',auth, departmentController.getDepartmentById);




module.exports = routes;
