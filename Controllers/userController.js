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
            const { firstName, lastName, email, password, phone, dob, experience, specialization} = req.body;
            if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
                return res.status(400).send({ message: "Content can not be empty!" });
            }
            // Validate user input
            if (!(email && password && firstName && lastName && phone)) {
                return res.status(400).json("All input is required!");
            }
            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            if (req.body.userType === "admin") {
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
            } else if (req.body.userType === "trainer") {
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
                        dob,
                        experience, 
                        specialization
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
            } else if (req.body.userType === "user") {
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
            } else {
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
    async getAllUser(req, res, next){
        try{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skipIndex = (page - 1) * limit;
            const data = {};
            const typeObje = {userType: req.query.userType};
    
            data.data = await userModel.find(typeObje).sort({_id: 1})
            .limit(limit)
            .skip(skipIndex)
            .exec();
            res.paginateddata = data;
            const total = await userModel.find(typeObje).count();
            res.status(200).send({message: "data got successfully", data: data, total})
            next();
        }catch(err){
            console.log("error ::: ", err);
            return res.status(500).send(err.message);
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
    //update Users by ID
    async updateUserById(req, res) {
        try {
            
            let certificationArray= []; 
            if(req.files.certification){
                req.files.certification.forEach(imagePath => {
                    certificationArray.push(imagePath.path)
                });
            }
            const userID = await userModel.findById({ _id: req.params.id});
            if (!userID) {
                return res.status(500).json({ error: "User ID is invalid!" })
            }
            
            if(userID.profileImage != null && req.files.profileImage){
                fs.unlink('./' + userID.profileImage, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            } 
            if (userID.certification != null && req.files.certification){
                userID.certification.forEach(data => {
                    fs.unlink('./' + data, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!::::::::::');
                    });
                });
                
            }
            if(userID.signature != null && req.files.signature){
                fs.unlink('./' + userID.signature, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
            const body = req.body;
            const profile = req.files.profileImage ? req.files.profileImage[0].path : userID.profile;
            const certificates =  req.files.certification ? certificationArray : userID.certification;
            const sign = req.files.signature ? req.files.signature[0].path : userID.signature ;
      
            const updatedUser = await userModel.findByIdAndUpdate(
                { _id: req.params.id, },
               // { $set: bodyData},
                { $set: { firstName: body.firstName, lastName: body.lastName, phone: body.phone, specialization: body.specialization, experience: body.experience, dob: body.dob, height: body.height, weight: body.weight, city: body.city, zipCode: body.zipCode, country: body.country, profileImage: profile, certification : certificates, signature: sign } },
                { new: true }
            );
            res.status(200).json({
                message : "User Records Updated Successfully!",
                data: updatedUser
            });
      
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    //Update Users
    async updateUser(req, res) {
        try {
            let certificationArray= []; 
            if(req.files.certification){
                req.files.certification.forEach(imagePath => {
                    certificationArray.push(imagePath.path)
                });
            }

            const userID = await userModel.findById(req.auth.id);
            if (!userID) {
                return res.status(500).json({ error: "User ID is invalid!" })
            }

            if(userID.profileImage != null && req.files.profileImage){
                fs.unlink('./' + userID.profileImage, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            } 
            if (userID.certification != null && req.files.certification){
                userID.certification.forEach(data => {
                    fs.unlink('./' + data, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!::::::::::');
                    });
                });
                
            }
            if(userID.signature != null && req.files.signature){
                fs.unlink('./' + userID.signature, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
            const body = req.body;
            const profile = req.files.profileImage ? req.files.profileImage[0].path : userID.profile;
            const certificates =  req.files.certification ? certificationArray : userID.certification;
            const sign = req.files.signature ? req.files.signature[0].path : userID.signature ;
            
            const updatedUser = await userModel.findByIdAndUpdate(
                { _id: req.auth.id, },
                { $set: { firstName: body.firstName, lastName: body.lastName, phone: body.phone, specialization: body.specialization, experience: body.experience, dob: body.dob, height: body.height, weight: body.weight, city: body.city, zipCode: body.zipCode, country: body.country, profileImage: profile, certification : certificates, signature: sign } },
                { new: true }
            );
            res.status(200).json({
                message : "User Records Updated Successfully!",
                data: updatedUser
            });
      
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    //Get Users Count By Type
    async getCountByType(req, res) {
        try {
            const typeObje = {userType: req.query.userType};
            const total = await userModel.find(typeObje).count();
            res.status(200).send({message: "Total User Counts!", data: total})
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    //Search User Date
    async userSearch(req, res) {
        try {
            const data = req.params.id;
            const regex = new RegExp(data, 'i')
            const condition = {$or : [
                {firstName : {$regex: regex}},
                {lastName : {$regex: regex}},
                {phone : {$regex: regex}},
                {email : {$regex: regex}},
                {experience : {$regex: regex}},
                {specialization : {$regex: regex}}
            ]}
            const queryData = await userModel.find(condition);
            if(!queryData) {
                return res.status(400).send('Error, No Data Found...!')
            }
            return res.status(200).send({message: "Search Data Got Successfully!", data: queryData})
        } catch (error) {
           res.status(500).send(error.message);
        }
    },
    // Update User Status
    async updateStatus(req, res){
        try {
            const userID = await userModel.findById({_id : req.params.id})
            if(!userID) {
                res.status(404).json({message : "User ID is not valid!"})
            }
            const userStatus = await userModel.findByIdAndUpdate(
                {_id : req.params.id},
                {$set: {status : req.body.status}},
                {new : true}
            );
            res.send({message:"User Status Updated Successfully!", data:userStatus})

        } catch (error) {
            res.status(500).send(error.message);
        }
    },
   // Create Fitness Calculator 
   async createCalculator (req, res) {
    try {
        let caloriesArray= []; 
        if(req.body.calorieNeeds){
            req.body.calorieNeeds.forEach(calory => {
                caloriesArray.push(calory)
            });
        }
        const userID = await userModel.findById(req.auth.id);
        const userCal = userID.fitnessCalcultor;
    
        if (!userID) {
            return res.status(500).send('Id is not valid')
        }
        userCal.push({
            _id: ObjectId(),
            gender :  req.body.gender,
            age : req.body.age,
            height : req.body.height,
            weight : req.body.weight,
            activity :  req.body.activity,
            neck : req.body.neck,
            waist : req.body.waist,
            hip : req.body.hip,
            goal : req.body.goal,
            bmi :  req.body.bmi,
            bmr : req.body.bmr,
            idealBodyWeight : req.body.idealBodyWeight,
            tdee : req.body.tdee,
            calorieNeeds : caloriesArray,
        });
    
        const createdCal = await userModel.findOneAndUpdate(
            { _id: req.auth.id },
            { $set: { fitnessCalcultor: userCal } },
            {new: true}
        );
    
        res.send({ message: "Fitness Details Added successfully", data: createdCal })
    } catch (error) {
        res.status(500).send(error.message);
    }
   },

}

//userModel.findOne({}).then(user => console.log('User', user));