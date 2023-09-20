const express = require("express");
const path = require('path');

const options = {
  caseSensitive: false,
  strict: false,
};

const router = express.Router(options);

router.get("/add-user", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'users.html'));
});

router.post("/user", (req, res, next) => {
    throw new Error('BROKEN');
    console.log(req.body);
    res.redirect("/add-user");

});

module.exports = router;
