const router = require('express').Router();
const userController = require("../Controllers/userController");

router.post('/create', userController.create); //Create Users
router.post('/login', userController.login); //Login
router.get('/get', userController.getAllUser); //Get All User with pagination
router.get('/get/:id', userController.getUserById); //Get User By ID
router.get('/getUser', userController.getUser); //Get User By ID
router.put('/updatebyid/:id', userController.updateUserById); //Update User By ID
router.put('/updateUser', userController.updateUser); //Update User

module.exports = router;