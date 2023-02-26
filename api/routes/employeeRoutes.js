const express = require('express');
const routes = express.Router();
const employeeController = require("../services/employee.service");
const multer = require('multer');
const crypto = require('crypto');
const auth = require("../middleware/auth");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, crypto.randomBytes(16).toString("hex") + file.originalname);
    }
  });
const upload = multer({ storage: storage });


routes.post('/add',auth, employeeController.createEmployee);
routes.get('/get',auth, employeeController.getEmployee);
routes.put('/update/:empId',auth, employeeController.updateEmployee);
routes.delete('/delete/:empId',auth, employeeController.deleteEmployee);
routes.get('/get/:empId',auth, employeeController.getEmployeebyId);


routes.post('/image-upload',auth,upload.single('image'),(req, res) => {
    const image = req.image;
    console.log(req.file)
      res.send(({message: 'File uploaded successfully.', data: req.file}));
  });


module.exports = routes;
