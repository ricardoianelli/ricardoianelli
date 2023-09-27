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

exports.add = (req, res, next) => {
    let prodInfo = req.body; //{productName, productPrice}
    let cart = ShoppingCart.findByUser(req.params.user);
    cart.addProduct(prodInfo.productName, prodInfo.productPrice);
    res.status(201).json(cart);
};

exports.remove = (req, res, next) => {
    let prodInfo = req.body; //{productName}
    let cart = ShoppingCart.findByUser(req.params.user);
    cart.removeProduct(prodInfo.productName);
    res.status(200).json(cart);
};


