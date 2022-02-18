const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: function(req, res) {
        const token = req.get('authorization');

        if (!token) {
            return false;
        }
        console.log(jwt.verify(token, '4E8CE938D1B11E5DCFC3717DC37FC'));
        if (!jwt.verify(token, '4E8CE938D1B11E5DCFC3717DC37FC')) {
            return false;
        }
        return true;
    }
}