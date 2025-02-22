import User from "../models/user.model.js";


export const getUsers = async (req, res, next) => {
    
    try {

        const users = await User.find().select('-password');
        res.status(200).json({
            "success": "true",
            "message": "list of all the users",
            data: {
                users                
            }
        })
        
    } catch (error) {
        next(error)
    }

}

export const getUser = async (req, res, next) => {
    
    try {
        const {id} = req.params

        const user = await User.find({ _id: id }).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 400;
            throw error
        }
        res.status(200).json({
            "success": "true",
            "message": "list of the user",
            data: {
                user             
            }
        })
        
    } catch (error) {
        next(error)
    }

}