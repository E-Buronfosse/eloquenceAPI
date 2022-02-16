module.exports = {
    signup: function(req, res) {
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        if (email == "" || password == "" || confirmPassword == "") {
            return res.status(400).json({ 'error': 'Missingparameters'});
        }

        if (password != confirmPassword) {
            return res.status(400).json({ 'error': 'Non identical passwords'});
        }
    }
}