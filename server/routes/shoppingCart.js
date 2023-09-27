const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/:user", shoppingCartController.getCart);
router.post("/:user", shoppingCartController.add);
router.delete("/:user", shoppingCartController.remove);
router.put("/:user", shoppingCartController.update);
router.post("/place/:user", shoppingCartController.placeOrder);

module.exports = router;