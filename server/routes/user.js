import express from 'express';
import {userLogin, verifyUser} from '../controller/user.js';


const userRouter = express.Router()

userRouter.post('/user/login', userLogin);
userRouter.post('/user/verify', verifyUser);

export default userRouter;