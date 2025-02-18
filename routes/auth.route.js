import express from 'express';
import { signIn, signOut, signUp } from '../controller/auth.controller.js';

const authRouter = express.Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/sign-out", signOut)

export default authRouter;



