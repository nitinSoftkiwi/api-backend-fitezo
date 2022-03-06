const router = require('express').Router();
const { required } = require("nodemon/lib/config");
const userController = require("../Controllers/userController");
const multer = require('multer');
const { route } = require('.');
const nodemailer = require('nodemailer')


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
const maxSize = 100 * 1024 * 1024; // for 1MB
const fileUpload = multer({ storage: storage }).fields([{name: "profileImage", maxCount: 1}, {name: "certification", maxCount: 5}, {name: "signature", maxCount: 1}]);
const categoryCoachImg = multer({ storage: storage }).fields([{name: "imageTypeTrainer", maxCount: 1}]);
const videoUpload = multer({ storage: storage, limits: { fileSize: maxSize } }).single('vidPath');

router.post('/create', userController.create); //Create Users
router.post('/login', userController.login); //Login
router.get('/get', userController.getAllUser); //Get All User with pagination
router.get('/get/:id', userController.getUserById); //Get User By ID
router.get('/getUser', userController.getUser); //Get User
router.put('/updateById/:id', fileUpload, userController.updateUserById); //Update User By ID
router.put('/updateUser', fileUpload, userController.updateUser); //Update User
router.get('/getCountByType', userController.getCountByType); //Get User Count
router.get('/search/:id', userController.userSearch); //Search Data for Users
router.get('/trainerSearch', userController.trainerSearch) // search trainer data (lang, gender,categoryTrainer)
router.put('/status/:id', userController.updateStatus); // Status Update
router.put('/categoryTrainer/:id', userController.updateCategoryTrainer); // Status Update
router.post('/createFitness', userController.createCalculator); //Create Fitness Data
router.post('/updateFitness', userController.updateCalculator); //Update Fitness Data
router.post('/createCategoryTrainer', categoryCoachImg, userController.createHeaderGetACoachAdmin); // create category get a coach header chnge category waise  
router.get('/getCategoryTrainer',  userController.getHeaderGetACoachAdmin); //Get All CategoryTrainer header change in get a coach api  with pagination
router.get('/coachSearch/:id', userController.getHeaderCoachSearch); // Search Coach
router.post('/rating/:id', userController.insertRating); //Rating
router.post('/videoGallary/:id', videoUpload, userController.insertTrainerVideoGallary); // Video upload for Trainer
router.put('/updateVideoGallary', videoUpload, userController.updateTrainerVideoGallery); // Update Video upload for Trainer
router.get('/viewVideo/:id',  userController.getTrainerVideo); // Delete uploaded video for Trainer
router.delete('/deleteVideoGallary/:id',  userController.deleteTrainerVideoGallery); // Delete uploaded video for Trainer
router.delete('/deleteAdminVideoGallary/:id/:trainerId',  userController.deleteAdminTrainerVideoGallery); // Delete uploaded video admin for Trainer
router.put('/updateAvailability/:id',  userController.updateTrainerAvailability); // Delete uploaded video for Trainer
router.post('/vacationTrainer', userController.vacationTrainer); //vacation tariner add startdate and enddate
router.get('/vacationTrainerStatus', userController.VacationNotificationTrainer); // vacation Trainer Status get noitifictation use admin
router.put('/vacationTrainerStatusChange/:id', userController.VacationNotificationTrainerChange); // vacation Trainer Status get noitifictation use admin
router.get('/videoShow/:id', userController.showVideoTrainer); // show video admin in personal trainer
router.post('/bookingTrainer', userController.BookingSlotByUser); // user book slot in trainer
router.put('/userSlotBookingStatus/:id', userController.userSlotBooking); // user book slot status chnage oto 2 is disable

module.exports = router;