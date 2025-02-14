import express from 'express'
const app = express()

import { PATH } from './config/env';

app.get("/", (req, res) => {
    res.send({ "message": "hi there" })
});

app.listen(PORT, () => {
    console.log(`your application is running on port ${PORT}`)
})