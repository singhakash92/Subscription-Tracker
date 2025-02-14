import express from 'express'

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send({"message" : "get all the users"})
})
userRouter.get("/:id", (req, res) => {
    res.send({"message" : "get  the users"})
})
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
