const Cart = require("../models/cartSchema");

//Add items to the cart
addToCart =  async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;

    // get the cart if already exist else create a new cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // get the details of the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
      });
    }

    cart.totalPrice = cart.calculateTotal();
    await cart.save();

    res.json({ message: "Item added to cart", status: "success" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

//get items in the cart
getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    // get the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", items: [] });
    }
    // take necessary details of the cart items
    const cartItems = cart.items.map((item) => ({
      productId: item.product._id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.price,
    }));

    res.json({ items: cartItems });

  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an item from the cart
deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    //get cart for the user
    const cart = await Cart.findOne({ user: userId });

    // check if the product is in the cart
    const itemIndex = cart.items.findIndex((item) => item.product === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Remove the item 
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.json({ message: "Item removed from cart successfully" });

  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// clear cart
clearCart = async (req, res) => {
  try {
      const userId = req.user.id;

      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Clear the items array in the cart
      cart.items = [];

      // Save the updated cart
      await cart.save();

      res.json({ message: 'Cart cleared successfully' });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

// update tha quantity of carted item
updateQuantity = async (req, res) => {
  try {
      const userId = req.user.id;
      const {productId,newQuantity} = req.body;

      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the item in the cart by product ID
      const cartItem = cart.items.find(item => item.product === productId);

      if (!cartItem) {
          return res.status(404).json({ message: 'Item not found in the cart' });
      }

      // Get the current quantity and price of the item
      const currentQuantity = cartItem.quantity;
      const itemPrice = cartItem.price;

      // Update the quantity of the item
      cartItem.quantity = newQuantity;

      // change in quantity
      const quantityChange = newQuantity - currentQuantity;

      // Update the total price of the cart based on the quantity change
      cart.totalPrice += quantityChange * itemPrice;

      // Save the update
      await cart.save();

      res.json({ message: 'Quantity updated successfully', changedData:{newQuantity,totalPrice:cart.totalPrice} });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
  clearCart,
  updateQuantity
};
