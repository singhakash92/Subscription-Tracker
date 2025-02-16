import express from 'express'


import { PORT } from './config/env.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import subRouter from './routes/subscription.route.js';
import connectDatabase from './database/mongodb.js';

const app = express();

app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/sub", subRouter)

app.get("/", (req, res) => {
    res.send({ "message": "hi there" })
});


app.listen(PORT, async () => {
    console.log(`your application is running on port ${PORT}`)
    await connectDatabase();
})