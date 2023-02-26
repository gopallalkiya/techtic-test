const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
      return next()
  }
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);