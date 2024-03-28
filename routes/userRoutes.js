const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")

//cart
//add to cart
router.post("/addToCart",userController.addToCart)

//list items in the cart
router.get('/cartItems',userController.getCartItems)

module.exports=router