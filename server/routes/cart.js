import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { addToCart, fetchCart, removeCart, updateCart } from "../controller/cart.js";

const router =  express.Router();

router.post('/cart/add', isAuth, addToCart);
router.get('/cart/remove/:id' , isAuth, removeCart );
router.post('/cart/update', isAuth, updateCart)
router.get('/cart/all', isAuth, fetchCart)

export default router;