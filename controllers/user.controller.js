const User = require('../models/User.model');

module.exports.user = (req, res, next) => {
    res.render('profile');
}