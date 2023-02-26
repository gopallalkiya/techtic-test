const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  employeename: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'department'
  },
  profileimage: {
    type: String,
  }

}, {
    timestamps: true
});

// export model employee with EmployeeSchema
module.exports = mongoose.model("employee", EmployeeSchema);