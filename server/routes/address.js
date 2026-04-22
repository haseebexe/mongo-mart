import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addAddress, getAllAddress, getSingleAddress, removeAddress } from "../controller/address.js";

const router = express.Router();

router.post('/address/add', isAuth, addAddress);
router.get('/address/all', isAuth, getAllAddress);
router.get('/address/:id', isAuth, getSingleAddress);
router.delete('/address/:id', isAuth, removeAddress )


export default router;