import express from 'express';

const subRouter = express.Router();

subRouter.get("/", (req, res) => {
    res.send({"message" : "get all subscription"})
})

subRouter.get("/:id", (req, res) => {
    res.send({"message" : "get a subscription"})
})

subRouter.post("/", (req, res) => {
    res.send({"message" : "create subscription"})
})

subRouter.put("/:id", (req, res) => {
    res.send({"message" : "update subscription"})
})

subRouter.delete("/", (req, res) => {
    res.send({"message" : "delete subscription"})
})

subRouter.get("/user/:id", (req, res) => {
    res.send({"message" : "user subscription"})
})

subRouter.put("/:id/cancel", (req, res) => {
    res.send({"message" : "cancel user subscription"})
})

subRouter.get("/upcoming-renewals", (req, res) => {
    res.send({"message" : "upcoming renewals"})
})




export default subRouter;