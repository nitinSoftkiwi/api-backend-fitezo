const router = require('express').Router();
const { required } = require("nodemon/lib/config");
const categoryController = require("../Controllers/categoryController");


router.post('/create', categoryController.create); //Create Category
router.put('/update/:id', categoryController.updateById); //Update Category



module.exports = router;