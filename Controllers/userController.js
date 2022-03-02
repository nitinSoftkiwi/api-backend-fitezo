const userModel = require("../Models/userModel");
const coachCategoryHeaderpageModel = require("../Models/coachCategoryHeaderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const firebase = require("firebase/auth");
const { send } = require("process");
const { ObjectId } = require("mongoose").Types;
const { query } = require("express");
require("dotenv").config();
const dotenv = require('dotenv');

dotenv.config();
const nodemailer = require("nodemailer");

module.exports = {
  //Create User
  async create(req, res) {
    let trainerAvailability = [
      {
        day: "Monday",
        date: "03-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Tuesday",
        date: "04-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Wednesday",
        date: "05-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Thursday",
        date: "06-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Friday",
        date: "07-01-2022",
        slots: [
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1,
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1,
          },
          {
            toTime: "12 PM",
            fromTime: "1 PM",
            status: 1,
          },
          {
            toTime: "1 PM",
            fromTime: "2 PM",
            status: 1,
          },
          {
            toTime: "2 PM",
            fromTime: "3 PM",
            status: 1,
          },
          {
            toTime: "3 PM",
            fromTime: "4 PM",
            status: 1,
          },
          {
            toTime: "4 PM",
            fromTime: "5 PM",
            status: 1,
          },
          {
            toTime: "5 PM",
            fromTime: "6 PM",
            status: 1,
          },
          {
            toTime: "6 PM",
            fromTime: "7 PM",
            status: 1,
          },
          {
            toTime: "7 PM",
            fromTime: "8 PM",
            status: 1,
          },
          {
            toTime: "8 PM",
            fromTime: "9 PM",
            status: 1,
          },
          {
            toTime: "9 PM",
            fromTime: "10 PM",
            status: 1,
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Saturday",
        date: "08-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
      {
        day: "Sunday",
        date: "09-01-2022",
        slots: [
          {
            toTime: "01 AM",
            fromTime: "02 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 AM",
            fromTime: "03 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 AM",
            fromTime: "04 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 AM",
            fromTime: "05 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 AM",
            fromTime: "06 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 AM",
            fromTime: "07 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 AM",
            fromTime: "08 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 AM",
            fromTime: "09 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 AM",
            fromTime: "10 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 AM",
            fromTime: "11 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 AM",
            fromTime: "12 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 PM",
            fromTime: "01 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "01 PM",
            fromTime: "02 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "02 PM",
            fromTime: "03 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "03 PM",
            fromTime: "04 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "04 PM",
            fromTime: "05 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "05 PM",
            fromTime: "06 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "06 PM",
            fromTime: "07 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "07 PM",
            fromTime: "08 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "08 PM",
            fromTime: "09 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "09 PM",
            fromTime: "10 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "10 PM",
            fromTime: "11 PM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "11 PM",
            fromTime: "12 AM",
            status: 1, // 0-Active, 1- Inactive
          },
          {
            toTime: "12 AM",
            fromTime: "01 AM",
            status: 1, // 0-Active, 1- Inactive
          },
        ],
        status: 1, // 0- Active, 1- Inactive
      },
    ];
    try {
      // Get user input
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        experience,
        specialization,
        language,
        gender,
      } = req.body;
      if (
        !req.body.email &&
        !req.body.firstName &&
        !req.body.lastName &&
        !req.body.phone
      ) {
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
        } else {
          const user = await userModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            phone,
          });
          const updatedUser = await userModel.findOneAndUpdate(
            { _id: user._id },
            { $set: { userType: req.body.userType } },
            { new: true }
          );
          res.json({
            message: "User created successfully!!",
            user: updatedUser,
          });
        }
      } else if (req.body.userType === "trainer") {
        // check if user already exist
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        } else {
          const user = await userModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            phone,
            dob,
            experience,
            specialization,
            trainerAvailabilities: trainerAvailability,
            language,
            gender,
          });
          const updatedUser = await userModel.findOneAndUpdate(
            { _id: user._id },
            { $set: { userType: req.body.userType } },
            { new: true }
          );
          res.send({
            message: "User created successfully!!",
            user: updatedUser,
          });
          // console.log(user,'heloooooooooo')
        }
      } else if (req.body.userType === "user") {
        // check if user already exist
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        } else {
          const user = await userModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            phone,
          });
          const updatedUser = await userModel.findOneAndUpdate(
            { _id: user._id },
            { $set: { userType: req.body.userType } },
            { new: true }
          );
          res.send({
            message: "User created successfully!!",
            user: updatedUser,
          });
        }
      } else {
        res.status(500).send({ message: "type is invalid" });
      }
    } catch (error) {
      console.log("error ::: ", error);
      res.status(500).json({
        message: error.message || "Some error occurred while creating user",
      });
    }
  },
  //User Login
  async login(req, res) {
    try {
      //console.log("body", req.body);
      const user = await userModel.findOne({
        email: req.body.email,
        status: 0,
      });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Password is invalid!" });
      }
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email & passsword incorrect!" });
      }
      const token = await jwt.sign({ id: user._id }, process.env.TOKEN_JWT, {
        expiresIn: "6000d",
      });
      res.setHeader("x-auth-token", token);
      res
        .status(200)
        .send({ message: "user login successfully", user: user, token });
    } catch (error) {
      console.log("error ::: ", error);
      return res
        .status(500)
        .send({ error: error.message, message: "something went wrong!" });
    }
  },
  // Get All User
  async getAllUser(req, res, next) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const data = {};
      const typeObje = { userType: req.query.userType };

      data.data = await userModel
        .find(typeObje)
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.paginateddata = data;
      const total = await userModel.find(typeObje).count();
      res
        .status(200)
        .send({ message: "data got successfully", data: data, total });
      next();
    } catch (err) {
      console.log("error ::: ", err);
      return res.status(500).send(err.message);
    }
  },
  // Get User By ID
  async getUserById(req, res) {
    try {
      const userID = await userModel.findById(req.params.id);
      res.status(200).json({
        message: "User Record!",
        data: userID,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  // Get User
  async getUser(req, res) {
    try {
      const userID = await userModel.findById(req.auth.id);
      res.status(200).json({
        message: "User Record!",
        data: userID,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //update Users by ID
  async updateUserById(req, res) {
    try {
      let certificationArray = [];
      if (req.files.certification) {
        req.files.certification.forEach((imagePath) => {
          certificationArray.push(imagePath.path);
        });
      }
      const userID = await userModel.findById({ _id: req.params.id });
      if (!userID) {
        return res.status(500).json({ error: "User ID is invalid!" });
      }

      if (userID.profileImage != null && req.files.profileImage) {
        fs.unlink("./" + userID.profileImage, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
      if (userID.certification != null && req.files.certification) {
        userID.certification.forEach((data) => {
          fs.unlink("./" + data, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log("File deleted!::::::::::");
          });
        });
      }
      if (userID.signature != null && req.files.signature) {
        fs.unlink("./" + userID.signature, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
      const body = req.body;
      const profile = req.files.profileImage
        ? req.files.profileImage[0].path
        : userID.profile;
      const certificates = req.files.certification
        ? certificationArray
        : userID.certification;
      const sign = req.files.signature
        ? req.files.signature[0].path
        : userID.signature;

      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        // { $set: bodyData},
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            specialization: body.specialization,
            experience: body.experience,
            dob: body.dob,
            height: body.height,
            weight: body.weight,
            about: body.about,
            city: body.city,
            zipCode: body.zipCode,
            country: body.country,
            categoryTypeTrainer: body.categoryTypeTrainer,
            profileImage: profile,
            certification: certificates,
            signature: sign,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "User Records Updated Successfully!",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Update Users
  async updateUser(req, res) {
    try {
      let certificationArray = [];
      if (req.files.certification) {
        req.files.certification.forEach((imagePath) => {
          certificationArray.push(imagePath.path);
        });
      }

      const userID = await userModel.findById(req.auth.id);
      if (!userID) {
        return res.status(500).json({ error: "User ID is invalid!" });
      }

      if (userID.profileImage != null && req.files.profileImage) {
        fs.unlink("./" + userID.profileImage, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
      if (userID.certification != null && req.files.certification) {
        userID.certification.forEach((data) => {
          fs.unlink("./" + data, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log("File deleted!::::::::::");
          });
        });
      }
      if (userID.signature != null && req.files.signature) {
        fs.unlink("./" + userID.signature, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log("File deleted!");
        });
      }
      const body = req.body;
      const profile = req.files.profileImage
        ? req.files.profileImage[0].path
        : userID.profile;
      const certificates = req.files.certification
        ? certificationArray
        : userID.certification;
      const sign = req.files.signature
        ? req.files.signature[0].path
        : userID.signature;

      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: req.auth.id },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            specialization: body.specialization,
            experience: body.experience,
            dob: body.dob,
            height: body.height,
            weight: body.weight,
            about: body.about,
            city: body.city,
            zipCode: body.zipCode,
            country: body.country,
            profileImage: profile,
            certification: certificates,
            signature: sign,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "User Records Updated Successfully!",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Get Users Count By Type
  async getCountByType(req, res) {
    try {
      const typeObje = { userType: req.query.userType };
      const total = await userModel.find(typeObje).count();
      res.status(200).send({ message: "Total User Counts!", data: total });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //Search User Date
  async userSearch(req, res) {
    try {
      const data = req.params.id;
      const regex = new RegExp(data, "i");
      const condition = {
        $or: [
          { firstName: { $regex: regex } },
          { lastName: { $regex: regex } },
          { phone: { $regex: regex } },
          { email: { $regex: regex } },
          { experience: { $regex: regex } },
          { specialization: { $regex: regex } },
          { categoryTypeTrainer: { $regex: regex } },
        ],
      };
      const queryData = await userModel.find(condition);
      if (!queryData) {
        return res.status(400).send("Error, No Data Found...!");
      }
      return res
        .status(200)
        .send({ message: "Search Data Got Successfully!", data: queryData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //search by gender and categorytrainer or language
  async trainerSearch(req, res) {
    try {
      //   const data = req.params.id;

      const categoryTrainer = req.query.categoryTrainer;
      const gender = req.query.gender;
      const slots = req.query.slots;
      const language = req.query.language;
      const cond = {};
      if (
        categoryTrainer !== null &&
        gender !== null &&
        slots !== null &&
        language !== null
      ) {
        cond.categoryTrainer = categoryTrainer;
        cond.gender = gender;
        cond.slots = slots;
        cond.language = language;
      }
      const queryData = await userModel.find(cond);
      if (!queryData) {
        return res.status(400).send("Error, No data Found...!");
      }
      return res
        .status(200)
        .send({ message: "Sesrch Data Got Successfully!", data: queryData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update User Status
  async updateStatus(req, res) {
    try {
      const userID = await userModel.findById({ _id: req.params.id });
      if (!userID) {
        res.status(404).json({ message: "User ID is not valid!" });
      }
      const userStatus = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { status: req.body.status } },
        { new: true }
      );
      res.send({
        message: "User Status Updated Successfully!",
        data: userStatus,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //update categoryTrainer like basic and stander
  async updateCategoryTrainer(req, res) {
    try {
      const userId = await userModel.findById({ _id: req.params.id });
      if (!userId) {
        res.status(404).json({ message: "user Id is not valid" });
      }
      const userCategoryTrainer = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { categoryTrainer: req.body.categoryTrainer } }, // basic and stander and premium
        { new: true }
      );
      res.send({
        message: "user Category Trainer update Successfully!",
        data: userCategoryTrainer,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create Fitness Calculator
  async createCalculator(req, res) {
    try {
      let caloriesArray = [];
      if (req.body.calorieNeeds) {
        req.body.calorieNeeds.forEach((calory) => {
          caloriesArray.push(calory);
        });
      }
      const userID = await userModel.findById(req.auth.id);
      const userCal = userID.fitnessCalcultor;

      if (!userID) {
        return res.status(500).send("Id is not valid");
      }
      userCal.push({
        _id: ObjectId(),
        gender: req.body.gender,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        activity: req.body.activity,
        neck: req.body.neck,
        waist: req.body.waist,
        hip: req.body.hip,
        goal: req.body.goal,
        bmi: req.body.bmi,
        bmr: req.body.bmr,
        idealBodyWeight: req.body.idealBodyWeight,
        tdee: req.body.tdee,
        calorieNeeds: caloriesArray,
      });

      const createdCal = await userModel.findOneAndUpdate(
        { _id: req.auth.id },
        { $set: { fitnessCalcultor: userCal } },
        { new: true }
      );

      res.send({
        message: "Fitness Details Added successfully",
        data: createdCal,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Update Fitness Calculator
  async updateCalculator(req, res) {
    try {
      let caloriesArray = [];
      if (req.body.calorieNeeds) {
        req.body.calorieNeeds.forEach((calory) => {
          caloriesArray.push(calory);
        });
      }
      // console.log("dddddd::", caloriesArray)
      const userID = await userModel.findById(req.auth.id);
      indexId = req.body;
      const userCal = userID.fitnessCalcultor;
      const checkIdx = userCal.findIndex(
        (fitnesId) => fitnesId._id == indexId.fitnesId
      );
      // console.log("IDDDD::::::", checkIdx)
      if (checkIdx != -1) {
        userCal[checkIdx].gender = indexId.gender;
        userCal[checkIdx].age = indexId.age;
        userCal[checkIdx].height = indexId.height;
        userCal[checkIdx].weight = indexId.weight;
        userCal[checkIdx].activity = indexId.activity;
        userCal[checkIdx].neck = indexId.neck;
        userCal[checkIdx].waist = indexId.waist;
        userCal[checkIdx].hip = indexId.hip;
        userCal[checkIdx].goal = indexId.goal;
        userCal[checkIdx].bmi = indexId.bmi;
        userCal[checkIdx].bmr = indexId.bmr;
        userCal[checkIdx].idealBodyWeight = indexId.idealBodyWeight;
        userCal[checkIdx].tdee = indexId.tdee;
        userCal[checkIdx].calorieNeeds = caloriesArray;
        userCal[checkIdx].updatedDate = indexId.updatedDate;
      }
      // console.log("ddddddaaaaaaaaaaaatttttt::",userCal )
      const updatedCal = await userModel.findOneAndUpdate(
        { _id: req.auth.id },
        { $set: { fitnessCalcultor: userCal } },
        { new: true }
      );

      res.send({
        message: "Fitness Details Updated successfully",
        data: updatedCal,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //admin create a category using get a coach page change( header heading img and paragrph)
  async createHeaderGetACoachAdmin(req, res) {
    try {
      const typeimg = req.files.imageTypeTrainer[0].path;
      if (
        !req.body.headingTrainer &&
        !req.body.paragraphTypeTrainer &&
        !typeimg &&
        !req.body.getCoachHeaderCategory
      ) {
        return res.status(400).send({ message: "Content can not be empty!" });
      } else {
        const createGetACoachHeaderTariner =
          await coachCategoryHeaderpageModel.create({
            headingTrainer: req.body.headingTrainer,
            paragraphTypeTrainer: req.body.paragraphTypeTrainer,
            imageTypeTrainer: req.files.imageTypeTrainer[0].path,
            getCoachHeaderCategory: req.body.getCoachHeaderCategory,
          });
        res.send({
          message: "Get a Coach category header created successfully!!",
          data: createGetACoachHeaderTariner,
        });
      }
    } catch (error) {
      console.log("error ::: ", error);
      res.status(500).json({
        message: error.message || "Some error occurred while creating Coach",
      });
    }
  },
  // admin get a category All using a get a coach field ( header heading img and paragrph)
  async getHeaderGetACoachAdmin(req, res, next) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const data = {};

      data.data = await coachCategoryHeaderpageModel
        .find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.paginateddata = data;
      const total = await coachCategoryHeaderpageModel.count();
      res.status(200).send({
        message: "Category data got successfully!",
        data: data,
        total,
      });
      next();
    } catch (err) {
      console.log("error ::: ", err);
      return res.status(500).send(err.message);
    }
  },
  // search Category Coach
  async getHeaderCoachSearch(req, res) {
    try {
      const data = req.params.id;
      const regex = new RegExp(data, "i");
      const condition = {
        $or: [
          { getCoachHeaderCategory: { $regex: regex } },
          { headingTrainer: { $regex: regex } },
          { paragraphTypeTrainer: { $regex: regex } },
          { imageTypeTrainer: { $regex: regex } },
        ],
      };
      const queryData = await coachCategoryHeaderpageModel.find(condition);
      if (!queryData) {
        return res.status(400).send("Error, No Data Found...!");
      }
      return res
        .status(200)
        .send({ message: "Search Data Got Successfully!", data: queryData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Create Rating
  async insertRating(req, res) {
    try {
      console.log("dddddddddd::::", req.body, req.params.id);
      const trainerID = await userModel.findById({ _id: req.params.id });
      if (!trainerID) {
        res.status(404).json({ message: "Trainer Id is not valid!" });
      }
      const rating = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { rating: req.body.rating } },
        { new: true }
      );
      res.send({ message: "Rating Submitted Successfully!", data: rating });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Upload Trainer Video
  async insertTrainerVideoGallary(req, res) {
    try {
      const videoPtah = req.file.path;
      const trainerID = await userModel.findById({ _id: req.params.id });
      const trainerVidID = trainerID.trainerVideo;
      if (!trainerID) {
        return res.status(500).send("Id is not valid");
      }
      trainerVidID.push({
        _id: ObjectId(),
        vidTitle: req.body.vidTitle,
        vidDescription: req.body.vidDescription,
        vidPath: videoPtah,
      });
      const insertVideo = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { trainerVideo: trainerVidID } },
        { new: true }
      );
      res.send({ message: "Video Uploaded Successfully!", data: insertVideo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //show all video trainer
  async showVideoTrainer (req, res){
      try {
          const trainerId = await userModel.findById({_id : req.params.id});
          res.status(200).json({
            message: "Video  Record Show!",
            data: trainerId,
          });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  },
  // update trainer uploaded videos
  async updateTrainerVideoGallery(req, res) {
    try {
      const trainerID = await userModel.findById(req.auth.id);
      indexId = req.body;
      const trainerVideoID = trainerID.trainerVideo;
      const checkIdx = trainerVideoID.findIndex(
        (videoID) => videoID._id == indexId.videoID
      );

      if (checkIdx != -1) {
        trainerVideoID[checkIdx].vidTitle = indexId.vidTitle;
        trainerVideoID[checkIdx].vidDescription = indexId.vidDescription;
        if (trainerVideoID[checkIdx].vidPath != null) {
          fs.unlink("./" + trainerVideoID[checkIdx].vidPath, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log("File deleted!");
          });
        }
        trainerVideoID[checkIdx].vidPath = req.file.path;
      }
      const updateTrainerVideo = await userModel.findOneAndUpdate(
        { _id: req.auth.id },
        { $set: { trainerVideo: trainerVideoID } },
        { new: true }
      );

      res.send({
        message: "Video Details Updated successfully",
        data: updateTrainerVideo,
      });
    } catch (error) {
      res.status(500).send(error, message);
    }
  },
  // Delete Trainer Video
  async deleteTrainerVideoGallery(req, res) {
    try {
      const updateTrainerVideo = await userModel.updateOne(
        { _id: req.auth.id },
        { $pull: { trainerVideo: { _id: req.params.id } } },
        { new: true }
      );
      res.send({ message: "Video Details Deleted successfully!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Delete admin ==== trainer Video
  async deleteAdminTrainerVideoGallery(req, res) {
    try {
      const updateAdminTrainerVideo = await userModel.updateOne(
        { _id: req.params.trainerId },
        { $pull: { trainerVideo: { _id: req.params.id } } },
        { new: true }
      );
      res.send({ message: "Video Details Deleted successfully!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Get Trainer Video
  async getTrainerVideo(req, res) {
    try {
      const trainerID = await userModel.findById(req.auth.id);
      ids = req.params.id;
      const trainerVideoID = trainerID.trainerVideo;
      const videoData = trainerVideoID.find((x) => x.id === ids);
      res
        .status(200)
        .send({ message: "Video Get Successfully!", data: videoData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //update Trainer Availability
  async updateTrainerAvailability(req, res) {
    try {
      let slotArray = [];
      req.body.slots.forEach((slotData) => {
        slotArray.push(slotData);
      });
      const trainerID = await userModel.findOne({ _id: req.auth.id });
      //console.log("IDDDDDD", trainerID)
      const indexId = req.body;
      const trainerAvailabilityDetails = trainerID.trainerAvailabilities;
      const checkIdx = trainerAvailabilityDetails.findIndex(
        (availId) => availId._id == indexId.availId
      );

      if (checkIdx != -1) {
        trainerAvailabilityDetails[checkIdx].date = indexId.date;
        trainerAvailabilityDetails[checkIdx].slots = slotArray;
        trainerAvailabilityDetails[checkIdx].status = 0;
      }
      const updateAvailability = await userModel.findOneAndUpdate(
        { _id: req.auth.id },
        { $set: { trainerAvailabilities: trainerAvailabilityDetails } },
        { new: true }
      );
      console.log("uuuuuuuuuTTT", updateAvailability);
      res.send({
        message: "Trainer Availability has been updated successfully!",
        data: updateAvailability,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //vacation Trainer add sucessfully go mail for admin
  async vacationTrainer(req, res) {
    try {
      
      const userID = await userModel.findById(req.auth.id);
      const userVacation = userID.vacationTrainer;

      if (!userID) {
        return res.status(500).send("Id is not valid");
      }
      userVacation.push({
        _id: ObjectId(),
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reasons: req.body.reasons,
      });
      const createdVacation = await userModel.findOneAndUpdate(
        { _id: req.auth.id },
        { $set: { vacationTrainer: userVacation } },
        { new: true }
      );
      //make mailable object
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_TO_EMAIL,
          pass: process.env.SMTP_TO_PASSWORD,
        },
      });
      transporter
        .sendMail({
          from: "'" +process.env.SMTP_TO_EMAIL+ "'", // sender address
          to: 'nitin@softkiwi.co.in', // list of receivers
          subject: "Vaction Leave for trainer Start Date and End Date ✔ no@reply auto Gen", // Subject line
          text: `
           Trainer Name: ${req.body.firstName}-${req.body.lastName}
                  Start Date:
                  ${req.body.startDate}
                 Reasons: ${req.body.reasons}   
                 
                  End Date: ${req.body.endDate}
                `, // plain text body
          html: `
          
          <h1>From: ${req.body.firstName}-${req.body.lastName}</h1>
          <p> Email: ${req.body.email}<p>
          <p>Trainer</p>
          <p>Date ${req.body.startDate}</p>
          <hr/>
          <h1>To,</h1>
          <h3>Fitezo Admin</h3>
          <p><b>Subject</b> Application for leave Reasons: ${req.body.reasons}   </h3> <p>
          <hr/>
          <p>Dear Fitezo Admin</p>,
          <p>I am writing this letter to inform you that I need leaves for  Start Date:
          ${req.body.startDate}, End Date: ${req.body.endDate}</p><hr/><h3>
          <p> I will be back  End Date: ${req.body.endDate} next day. I was working on at present. I hope you are fine with this, and if required you can reach me any time through mobile.</p>
        <p>Thanks for considering my leave application and helping me in a tough situation.</p>

       <p> Thanking You,<p>
        
       <p> Yours sincerely,</p>
        <h4>${req.body.firstName}' ${req.body.lastName}</h4>
                  
         `, // html body
        })
        .then((info) => {
          console.log({ info });
        })
        .catch(console.error);
      res.status(200).send({
        message: "Vacation Date Added successfully",
        data: createdVacation,
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  //vacation Trainer notifications admin side
  async VacationNotificationTrainer (req, res){
      try {
          //const userId = await userModel.findById({_id : req.params.id});
          const trainer = await userModel.find({userType: 'trainer', vacationTrainer: { $exists: true, $ne: [] }, 'vacationTrainer.status': 0 });
        //   console.log('Vactionnn Tainer', trainer.length);
          res.status(200).json({
            message: "Vaction Trainer Record!",
            data: trainer,
          });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  },
  //vacation Trainer change status for admin side
  async VacationNotificationTrainerChange (req, res){
    try {
        // console.log('userid DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', req.params)
        const trainerData = await userModel.updateOne({'vacationTrainer._id': req.params.id}, {$set: {'vacationTrainer.$.status': 1}});
        res.status(200).json({
            message: "Vaction Trainer Status Change Record!",
            data: trainerData,
          })
    } catch (error) {
        res.status(405).json({message: error.message})
    }
  }
};

//userModel.findOne({}).then(user => console.log('User', user));
