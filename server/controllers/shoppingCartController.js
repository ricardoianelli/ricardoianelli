const ShoppingCart = require("../models/shoppingCart");

exports.getCart = (req, res, next) => {
    let cart = ShoppingCart.findByUser(req.params.user);
    res.status(200).json(cart);
};

exports.update = (req, res, next) => {
    let cart = req.body;
    let updatedCart = ShoppingCart.fromJson(cart);
    updatedCart.update();
    res.status(200).json(updatedCart);
};


