const errorMiddleware = (err, req, res, next) => {
// console.log("o")
//     The new error has properties like:
// .message → The error message
// .stack → Stack trace (shows where the error occurred)
// .name → "Error" (or a custom error name)

    try {
        let  error  = { ...err }
        
        // we are retaining the original message incase if any of the below errors are not occuring
        error.message = err.message
        // console.error(err)

        // console.log("1");
        // console.log(err);
        // console.log("1");
        // console.log("1");

        // while searching using a _id if we have given a wrong id 
        if (err.name === 'CastError') {
            const message = "resource not found"
            error = new Error(message);
            error.statusCode = 404 
        }

        //list of all validation error means the field we have in our table for each field if any field throws an error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((val) => val.message)
            error = new Error(message.join(", "))
            error.statusCode = 400
               
        };

        // field which should a unique value we are providing a value which is already present
        if (error.code === 11000) {
            const message = "duplicate field value entered";
            error = new Error(message);
            error.statusCode = 404 
        }


        res.status(error.statusCode || 500).json({
            success: "false",
            error : error.message || "Server Error"
        })
        
    } catch (error) {
        next(error)
    }
    
}

export default errorMiddleware