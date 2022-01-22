const router = require('express').Router();
const { required } = require("nodemon/lib/config");
const userController = require("../Controllers/userController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      //console.log('image details', file, cb);
      cb(null, Date.now()+ '-' +file.originalname)
    }
});
const mediaFilter = (req, file, cb) => {
  if ( file.mimetype == "pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
    cb(null, true) 
  } else { cb(null, false)}
}

const fileUpload = multer({ storage: storage }).fields([{name: "profileImage", maxCount: 1}, {name: "certification", maxCount: 5}, {name: "signature", maxCount: 1}]);


router.post('/create', userController.create); //Create Users
router.post('/login', userController.login); //Login
router.get('/get', userController.getAllUser); //Get All User with pagination
router.get('/get/:id', userController.getUserById); //Get User By ID
router.get('/getUser', userController.getUser); //Get User By ID
router.put('/updatebyid/:id', fileUpload, userController.updateUserById); //Update User By ID
router.put('/updateUser', userController.updateUser); //Update User

module.exports = router;