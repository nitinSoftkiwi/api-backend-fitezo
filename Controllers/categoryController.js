const categoryModel = require('../Models/categoryModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const firebase = require('firebase/auth');
const { ObjectId } = require('mongoose').Types;

module.exports = {

    //Create Category
    async create(req, res) {
        try {
            // Get input
            if (!(req.body.title && req.body.description)) {
                return res.status(400).json("All input is required!");
            }
            const createCategory = await categoryModel.create(req.body);
            res.send({  message: "Category created successfully!!", data: createCategory});
        } catch (error) {
            console.log("error ::: ", error);
            res.status(500).json({
                message: error.message || "Some error occurred while creating category"
            });
        }  
    },
    //Get All Category
    async getAllCategory(req, res, next){
        try{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skipIndex = (page - 1) * limit;
            const data = {};
      
            data.data = await categoryModel.find().sort({_id: 1})
            .limit(limit)
            .skip(skipIndex)
            .exec();
            res.paginateddata = data;
            const total = await categoryModel.count();
            res.status(200).send({message: "Category data got successfully!", data: data, total})
            next();
        }catch(err){
            console.log("error ::: ", err);
            return res.status(500).send(err.message);
        }
    },
    //Get Category By ID
    async getCategoryById(req, res){
        try{
            const catID = await categoryModel.findById(req.params.id)
            res.status(200).json({
                message : "Category Record!",
                data: catID
            });
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    async updateCategoryById(req, res){
        const catID =  await categoryModel.findById({_id: req.params.id})
        if(!catID){
            res.status(404).json({message : "Category is not valid!"})
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : {title: req.body.title, description:req.body.description, status: req.body.status}},
            {new : true}
        )
        res.send({message : "Category updated successfully", data: updatedCategory })
    },
    
  
   

}
