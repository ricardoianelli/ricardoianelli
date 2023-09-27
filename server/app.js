const express = require('express');
const cors = require('cors');

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const shoppingCartRouter = require("./routes/shoppingCart");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", shoppingCartRouter);

app.use((req, res, next) => {
    res.status(404).json({error: req.url + ' is not a valid route.'});
});

app.use((err, req, res, next) => {
    res.status(500).json({error: "Error: " + err.message});
});

app.listen(3000, () => console.log('listening to 3000...'));