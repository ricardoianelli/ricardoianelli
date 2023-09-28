//TODO: have to add tokens functionality on the backend.

const express = require('express');
const cors = require('cors');

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const shoppingCartRouter = require("./routes/shoppingCart");
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use((req, res, next) => {
    if (userController.isAValidToken(req.headers.auth)) {
        return next();
    }
    res.status(401).json({error: req.headers.auth + ' is not a valid token.'});
});

app.use("/products", productRouter);
app.use("/cart", shoppingCartRouter);

app.use((req, res, next) => {
    res.status(404).json({error: req.url + ' is not a valid route.'});
});

app.use((err, req, res, next) => {
    res.status(500).json({error: "Error: " + err.message});
});

app.listen(3000, () => console.log('Server running on port 3000! :)'));