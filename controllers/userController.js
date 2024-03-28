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

module.exports = {
  addToCart,
  getCartItems
};
