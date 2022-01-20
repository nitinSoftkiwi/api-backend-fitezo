const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const firebase = require('firebase/auth');
const { ObjectId } = require('mongoose').Types;

module.exports = {

    //Create User
    async create(req, res) {
        try {
            // Get user input
            const { firstName, lastName, email, password, phone } = req.body;
            if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
                return res.status(400).send({ message: "Content can not be empty!" });
            }
            // Validate user input
            if (!(email && password && firstName && lastName && phone)) {
                return res.status(400).json("All input is required!");
            }
            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            if (['user', 'trainer'].includes(req.body.userType)) {
                // check if user already exist
                const oldUser = await userModel.findOne({ email });
                
                if (oldUser) {
                    return res.status(409).json("User Already Exist. Please Login");
                }else{
                    const user = await userModel.create({
                        firstName,
                        lastName,
                        email : email.toLowerCase(), // sanitize: convert email to lowercase
                        password: encryptedPassword,
                        phone
                    });
                    const updatedUser = await userModel.findOneAndUpdate(
                        { _id: user._id },
                        { $set: { userType: req.body.userType } },
                        {new: true}
                    );
                    res.json({
                        message:"User created successfully!!",
                        user:updatedUser
                    });
                }
            } else if (req.body.userType === "admin") {
                // check if user already exist
                const oldUser = await userModel.findOne({ email });
                if (oldUser) {
                    return res.status(409).send("User Already Exist. Please Login");
                }else{
                    const user = await userModel.create({
                        firstName,
                        lastName,
                        email : email.toLowerCase(), // sanitize: convert email to lowercase
                        password: encryptedPassword,
                        phone,
                    });
                    const updatedUser = await userModel.findOneAndUpdate(
                        { _id: user._id },
                        { $set: { userType: req.body.userType } },
                        {new: true}
                    );
                    res.send({
                        message:"User created successfully!!",
                        user:updatedUser
                    });
                }
            }else {
                res.status(500).send({message : "type is invalid"})
            }
            
        } catch (error) {
            console.log("error ::: ", error);
            res.status(500).json({
                message: error.message || "Some error occurred while creating user"
            });
        }  
    },
    //User Login
    async login(req, res) {
       
        try {
            //console.log("body", req.body);
            const user = await userModel.findOne({
                email: req.body.email,
                status: 0
            });
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(400).json({ error: "Password is invalid!" })
            }
            if (!user) {
                return res.status(400).json({message: "Email & passsword incorrect!"});
            }
            const token = await jwt.sign({id: user._id}, process.env.TOKEN_JWT, {expiresIn: '6000d'});
            res.setHeader("x-auth-token", token);
            res.status(200).send({message: "user login successfully", user: user, token});
        } catch (error) {
            console.log("error ::: ", error);
            return res.status(500).send({error : error.messsage , message : "something went wrong!"})
        }
    },
    // Get All User
    async getAllUser(req, res){
        try {
            const users = await userModel.find();
            res.status(200).json({
                message : "User Record!",
                data:users});
        } catch(error) {
            res.status(404).json({message: error.message});
        }
    },
    // Get User By ID
    async getUserById(req, res){
        try{
            const userID = await userModel.findById(req.params.id)
            res.status(200).json({
                message : "User Record!",
                data: userID
            });
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    // Get User
    async getUser(req, res){
        try{
            const userID = await userModel.findById(req.auth.id)
            res.status(200).json({
                message : "User Record!",
                data: userID
            });
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
      
}

userModel.findOne({}).then(user => console.log('User', user));