const User = require('../models/user');
var Tokens = [];

exports.login = (req, res, next) => {
    const user = User.findUser(req.body.username, req.body.password);
    const token = generateToken(req.body.username);
    Tokens.push(token);
    res.status(200).json({ name: user.name, username: user.username, token: token });
}

this.isAValidToken = (token) => {
    return token != null && token != undefined && Tokens.includes(token);
};

generateToken = function(user) {
    return user + Math.random();
};