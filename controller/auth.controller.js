import mongoose from "mongoose";    
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
         const { name, email, password } = req.body;

         // check if user already exists
         const userExists = await User.findOne({ email: email });
        //  console.log(userExists);

         if (userExists) {
           const error = new Error("User already exists");
           error.statusCode = 409;
           throw error;
         } else {
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);

           // the second object helps to keep track of what to roll back
           const newUser = await User.create(
             [{ name, email, password: hashedPassword }],
             { session }
           );

             const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET);
             
              session.commitTransaction();
              session.endSession();

              res.status(200).json({
                success: true,
                message: "User Created Successfully",
                data: {
                  token: token,
                  userId: newUser[0]._id,
                },
              });
         }
        
    } catch (error) {
        
        // if something goes south don't do anything simply abort the txn and end the session
        session.abortTransaction();
        session.endSession();
        next(error)
        
    }
}

export const signIn = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email })
    
    if (!userExists) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error
    } else {

      const isPasswordValid = await bcrypt.compare(password, userExists.password)
      
      if (!isPasswordValid) {
         const error = new Error("Invalid password or email");
         error.statusCode = 404;
         throw error;
      } else {

        const token = jwt.sign({ userId: userExists._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
        
        res.status(200).json({
          "success": true, 
          "message": "User signed in successfully",
          data: {
            token: token,
            user : userExists
           }
        })
        
      }
      
    }
    
  } catch (error) {
    next(error)
  }
}

export const signOut = (req, res, next) =>{
  res.send({ message: "sign-out route" });
}
