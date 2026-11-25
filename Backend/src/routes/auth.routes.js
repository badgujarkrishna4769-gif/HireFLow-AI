const {Router} = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddlewares = require("../middlewares/auth.middleware");
const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUSerController);

/**
 * @route POST /api/auth/login
 * @description login a existing user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description logout the user, delete token from cookie and add token in blacklistToken
 * @access Public 
 */
authRouter.get("/logout", authController.logoutUserController);


/**
 * @route GET /api/auth/authuser
 * @description will get the details of logged in user
 * @access Public
 */
authRouter.get("/getme", authMiddlewares.authUser, authController.getMeController);


module.exports = authRouter;