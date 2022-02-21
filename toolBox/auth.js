const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: function (req, res) {
        const token = req.get('authorization');

        if (!token) {
            return false;
        }
        try {
            jwt.verify(token, privateKey);
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    },
};
