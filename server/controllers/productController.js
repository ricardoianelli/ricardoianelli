const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.status(200).json(Product.fetchAll());
}

exports.getProductByName = (req, res, next) => {
    res.status(200).json(Product.findByName(req.params.name));
}

exports.save = (req, res, next) => {
    const prod = req.body;
    if (Product.findByName(prod.name) != null) {
        throw new Error("Product already exists");
    }
    const savedProd = new Product(prod.name, prod.price, prod.image, prod.stock).save();
    res.status(201).json(savedProd);
}

exports.update = (req, res, next) => {
    const prod = req.body;
    const updatedProd = new Product(prod.name, prod.price, prod.image, prod.stock).update();
    res.status(200).json(updatedProd);
}

exports.deleteByName = (req, res, next) => {
    Product.deleteByName(req.params.name);
    res.status(200).end();
}