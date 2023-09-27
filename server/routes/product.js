const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

router.get('/:name', productController.getProductByName);

router.post('/', productController.save);

router.put('/:name', productController.update);

router.delete('/:name', productController.deleteByName);

module.exports = router;