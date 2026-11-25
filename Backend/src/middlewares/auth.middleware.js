const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized user, Token not found.",
        })
    }

    const isTokenBlacklist = await tokenBlacklistModel.findOne({token});

    if(isTokenBlacklist) {
        return res.status(400).json({
            message: "Invalid token found. access denied"
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(err) {
        return res.status(404).json({
            message: "There was an error authorizing the user."
        })
    }
}

module.exports = { authUser }