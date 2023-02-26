
const DepartmentModel = require('../models/department.model')


const createDepartment = async(req, res) => {
    const { departmentname, departmentid } = req.body
    try {
        const departmentobj = await DepartmentModel.create({
            departmentname,
            departmentid
        })
        return res.status(201).json({ message: 'Department Successfully Created', data: departmentobj })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', error: e })
    }
}

const getDepartment = async(req, res) => {
    try {
        await DepartmentModel.find().then((results) => {
            console.log(results.length)
            return res.status(200).json({ message: 'Department Data Successfully Fetched',  results })
        }) 
    } catch (err) {
        console.log(err)
        res.status(500).json(new MobileErr('Something went wrong', 'toast', { error: err.message }, req.baseHeaders))
    }
}

const getDepartmentById = async(req, res) => {
    try {
        await DepartmentModel.findById(req.params.deptId).then((results) => {
            console.log(results.length)
            return res.status(200).json({ message: 'Department Data Successfully Fetched',  results })
        }) 
    } catch (err) {
        console.log(err)
        res.status(500).json(new MobileErr('Something went wrong', 'toast', { error: err.message }, req.baseHeaders))
    }
}

const updateDepartment = async(req, res) => {
    try {
        const { deptId } = req.params
        const isDepartmentExist = await DepartmentModel.findOne({ _id: deptId })
        console.log(isDepartmentExist, 'isDepartmentExist')
    if (!isDepartmentExist) {
        return res
            .status(404)
            .json({message: 'Department data not found'})
    }
     else {
        let finalDataforUpdate = {
            departmentname: req.body.departmentname,
            departmentid: req.body.departmentid
        }
        console.log(finalDataforUpdate, 'FINALUPDATEEE')
       return  await DepartmentModel.findOneAndUpdate({ _id: deptId }, finalDataforUpdate, { new: true, upsert: true }).then((data) => 
         res.json({message: 'Department Data updated successfully!', data: data})
        )
    }
    } catch (e) {
        return res
        .status(203)
        .json({ message: 'Something went wrong', error: e})
    }
}

const deleteDepartment = async(req, res) => {
    try {
        const { deptId } = req.params
        await DepartmentModel.deleteOne({ "_id" :  deptId}).then(async (data) => {
            res.json({message: 'Department Data Successfully Deleted', data: data})
        })
    } catch (e) {
        return res
        .status(203)
        .json({ message: 'Something went wrong', error: e})
    }
}


module.exports = {
    createDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById
}