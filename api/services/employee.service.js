
const EmployeeModel = require('../models/employee.model')
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;


const createEmployee = async(req, res) => {
    const { employeename, gender,address,salary,department,profileimage } = req.body
    try {
        const employeeobj = await EmployeeModel.create({
            employeename, gender,address,salary,department,profileimage
        })
        return res.status(201).json({ message: 'Employee Successfully Created', data: employeeobj })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', error: e })
    }
}

const getEmployee = async(req, res) => {
    try {
        const getempDetails = await EmployeeModel.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: '_id',
                    as: 'deptinfo',
                },
            }
        ]).allowDiskUse(true)
        console.log(getempDetails, 'getempDetails')

            return res.status(200).json({ message: 'Employee Data Successfully Fetched', data: getempDetails })
      
    } catch (err) {
        console.log(err)
        res.status(500).json(new MobileErr('Something went wrong', 'toast', { error: err.message }, req.baseHeaders))
    }
}

const getEmployeebyId = async(req, res) => {
    try {
        console.log(req.params.empId, 'EEE')
        const getempDetails = await EmployeeModel.aggregate([
            { $match: { _id: ObjectId(req.params.empId) } },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: '_id',
                    as: 'deptinfo',
                },
            }
        ]).allowDiskUse(true)
        console.log(getempDetails, 'getempDetails')

            return res.status(200).json({ message: 'Employee Data Successfully Fetched', data: getempDetails })
      
    } catch (err) {
        console.log(err)
        res.status(500).json(new MobileErr('Something went wrong', 'toast', { error: err.message }, req.baseHeaders))
    }
}

const updateEmployee = async(req, res) => {
    try {
        const { empId } = req.params
        const isEmployeeExist = await EmployeeModel.findOne({ _id: empId })
        console.log(isEmployeeExist, 'isEmployeeExist')
    if (!isEmployeeExist) {
        return res
            .status(404)
            .json({message: 'Employee data not found'})
    }
     else {
        let finalDataforUpdate = {
            employeename: req.body.employeename,
            gender: req.body.gender,
            address: req.body.address,
            salary: req.body.salary,
            department: req.body.department,
            profileimage: req.body.profileimage
        }
        console.log(finalDataforUpdate, 'FINALUPDATEEE')
       return  await EmployeeModel.findOneAndUpdate({ _id: empId }, finalDataforUpdate, { new: true, upsert: true }).then((data) => 
         res.json({message: 'Employee Data updated successfully!', data: data})
        )
    }
    } catch (e) {
        return res
        .status(203)
        .json({ message: 'Something went wrong', error: e})
    }
}

const deleteEmployee = async(req, res) => {
    try {
        const { empId } = req.params
        await EmployeeModel.deleteOne({ "_id" :  empId}).then(async (data) => {
            res.json({message: 'Employee Data Successfully Deleted', data: data})
        })
    } catch (e) {
        return res
        .status(203)
        .json({ message: 'Something went wrong', error: e})
    }
}







module.exports = {
    createEmployee,
    getEmployee,
    getEmployeebyId,
    updateEmployee,
    deleteEmployee,   
}