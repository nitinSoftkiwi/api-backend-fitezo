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
    async getAllCategory(req, res){

    },
    //Get Category By ID
    async getById(req, res){

    },
    async updateById(req, res){
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
