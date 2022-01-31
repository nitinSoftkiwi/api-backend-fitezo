const router = require('express').Router();
const { require } = require("nodemon/lib/config");
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
router.put('/updateById/:id', fileUpload, userController.updateUserById); //Update User By ID
router.put('/updateUser', fileUpload, userController.updateUser); //Update User
router.get('/getCountByType', userController.getCountByType); //Get User Count
router.get('/search/:id', userController.userSearch); //Get User Count
router.put('/status/:id', userController.updateStatus); // Status Update


module.exports = router;