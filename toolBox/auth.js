const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: function(req, res) {
        const token = req.body.token

        if (!token) {
            return res.status(403).json({ 'error': 'Token missing for authentification' })
        }
        try {
            const decodedToken = jwt.verify(token, env.TOKEN_KEY);
            if (decodedToken != userToken) {
                return res.status(401).send("Invalid Token");
            }
            return true;
          } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
}