import mongoose from "mongoose";

import { DB_URI } from "../config/env.js";


if (!DB_URI) {
    throw new Error("please enter the connection string DB_URI in .env.production/development.local")
}

const connectDatabase = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("connected to database")
    } catch (error) {
        console.log("error connecting to database", error)   
        process.exit(1)
    }
}

export default connectDatabase;