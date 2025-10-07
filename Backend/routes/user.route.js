const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const UserController = require("../controllers/user.controller");
const authmiddleware = require("../middleware/auth.middleware");

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
  UserController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
  UserController.loginUser
);

router.get('/profile', authmiddleware.authUser, UserController.getUserProfile);

router.put('/profile', [
  authmiddleware.authUser,
  body('email').optional().isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').optional().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], UserController.updateUserProfile);

router.delete('/profile', authmiddleware.authUser, UserController.deleteUserProfile);

router.get('/logout', authmiddleware.authUser, UserController.logoutUser);

router.post('/password/forgot',authmiddleware.authUser,UserController.forgotPassord);
router.put('/password/:token',authmiddleware.authUser,UserController.resetPassword)
module.exports = router;