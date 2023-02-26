const UserModel = require('../models/user.model')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signUp = async (req, res) => {
    console.log('CALLED  Signup')
    const { name, email, password, mobile } = req.body
    const isEmailExists = await UserModel.findOne({ email })
    if (isEmailExists)
        return res.status(400).json({ message: "Email already exists" })
    const userId = mongoose.Types.ObjectId()

    try {
        const userObj = await UserModel.create({
            name,
            mobile,
            password,
            email,
            _id: userId,
        })
        return res.status(201).json({ message: 'Sign up successfully', data: userObj })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong', error: e })
    }
}

const login = async (req, res) => {
try {
        const { email, password } = req.body;
    let user = await UserModel.findOne({email});
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,process.env.SECRET_SALT,
            {expiresIn: process.env.TOKEN_EXPIRATION_TIME},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    message: "Login Successfully",
                    data: user,
                    token: token
                });
            }
        );
    } catch (e) {
        console.log({ e })
        return res.status(500).json({ message: 'Something went wrong', error: e })
    }

}
module.exports = {
    signUp,
    login
}