const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/:user", shoppingCartController.getCart);
router.put("/:user", shoppingCartController.update);

module.exports = router;