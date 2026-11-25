const { Router } = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");


const authRouter = Router();

/**
 * @name registerUSerController
 * @description Register a new user using - username, email and password in the registerUSerController
 * @access Public
 */
async function registerUSerController(req, res) {

    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User is already exist with given username or email."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { id: user._id, username: user.username}, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(201).json({
        message: "user is registered successfully.",
        user: user
    })
    
}

/**
 * @name loginUserController
 * @description Login a user if it exists 
 * @access Public
 */
async function loginUserController(req, res) {

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(400).json({
            message: "User doesn't exists with given email."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Incorrect password."
        })
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully.",
        user
    })
}

/**
 * @name logoutUserController
 * @description logout user 
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(400).json({
            message: "Unauthorized user."
        })
    }else {
        await tokenBlacklistModel.create({
            token
        })

        res.clearCookie("token");

        res.status(200).json({
            message: "User has been logged out successfull."
        })
    }
}

/**
 * @name getMeController
 * @description will get the details of logged in user
 * @access Public
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if(!user) {
            return res.status(401).json({
                message: "User not found."
            })
        }
        
        res.status(200).json({
            message: "User details fetched successfully.",
            user
        });

    }catch(err) {
        console.log(err);
    }

}


module.exports = {registerUSerController, loginUserController, logoutUserController, getMeController}