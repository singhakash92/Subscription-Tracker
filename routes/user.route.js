import express from 'express'
import { getUsers } from '../controller/user.controller.js'
import { getUser } from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", getUser)

userRouter.post("/", (req, res) => {
    res.send({"message" : "create user"})
})
userRouter.put("/:id", (req, res) => {
    res.send({"message" : "update user"})
})
userRouter.delete("/:id", (req, res) => {
    res.send({"message" : "delete user"})
})


export default userRouter;
