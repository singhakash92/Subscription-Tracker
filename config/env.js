import { config } from "dotenv";

// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })
// loads up the .env file content in process.js
config({path : '.env.development.local'})

export const {PORT} = process.env