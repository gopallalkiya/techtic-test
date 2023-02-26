const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  departmentname: {
    type: String,
    required: true
  },
  departmentid: {
    type: String,
    required: true
  },
  
}, {
    timestamps: true
});

// export model department with DepartmentSchema
module.exports = mongoose.model("department", DepartmentSchema);