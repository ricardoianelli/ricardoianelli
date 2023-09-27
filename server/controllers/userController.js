const User = require('../models/user');

exports.login = (req, res, next) => {
    const user = User.findUser(req.body.username, req.body.password);

    res.status(200).json({ name: user.name, username: user.username });
}