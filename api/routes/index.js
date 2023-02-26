const express = require('express');
const authRoutes = require("./authRoutes");
const departmentRoutes = require('./departmentRoutes')
const employeeRoutes = require('./employeeRoutes')

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/department", departmentRoutes)
router.use("/employee", employeeRoutes)


module.exports = router;