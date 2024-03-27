const mongoose = require('mongoose');

//schema for cart items
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
});

//schema for the cart
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    totalPrice:{
        type:Number,
        required:true
    }
});

// Calculate the total price of items in the cart
cartSchema.methods.calculateTotal = function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
