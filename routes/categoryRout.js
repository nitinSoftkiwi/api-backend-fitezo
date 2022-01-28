const router = require('express').Router();
const { required } = require("nodemon/lib/config");
const categoryController = require("../Controllers/categoryController");


router.post('/create', categoryController.create); //Create Category
router.get('/get', categoryController.getAllCategory); //Get All Category with pagination
router.get('/get/:id', categoryController.getCategoryById); //Get Category  By ID
router.put('/update/:id', categoryController.updateCategoryById); //Update Category



module.exports = router;