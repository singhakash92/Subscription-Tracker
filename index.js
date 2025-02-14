import express from 'express'
const app = express()

import { PATH } from './config/env';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import subRouter from './routes/subscription.route';

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/sub", subRouter)

app.get("/", (req, res) => {
    res.send({ "message": "hi there" })
});

app.listen(PORT, () => {
    console.log(`your application is running on port ${PORT}`)
})