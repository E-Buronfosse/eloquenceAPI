const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: function(req, res) {
        const token = req.get('authorization');

        if (!token) {
            return false;
        }

        if (global.userToken != token) {
            return false;
        }
        return true;
    }
}