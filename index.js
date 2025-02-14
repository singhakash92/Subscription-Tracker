import express from 'express'
const app = express()


const PORT = 4000;

app.get("/", (req, res) => {
    res.send({ "message": "hi there" })
});

app.listen(PORT, () => {
    console.log(`your application is running on port ${PORT}`)
})