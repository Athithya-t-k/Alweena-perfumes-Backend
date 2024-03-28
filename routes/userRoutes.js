const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")

//cart
//add to cart
router.post("/addToCart",userController.addToCart)

//list items in the cart
router.get('/cartItems',userController.getCartItems)

//delete item from the cart
router.delete('/removeItem/:productId',userController.deleteCartItem)

//clear cart
router.delete('/clearCart',userController.clearCart)

//update item quantity
router.put('/updateQuantity',userController.updateQuantity)

// Add review
router.post('/review',userController.addReview)

module.exports=router