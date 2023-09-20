const express = require('express');
const path = require('path');

const productRouter = require('./products');
const userRouter = require('./users');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname));

app.use(productRouter);
app.use(userRouter);

app.get('/', (req, res, next) => {res.send("This is the main page!")});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});
    

app.listen(3000, () => console.log('listening on 3000...'));
