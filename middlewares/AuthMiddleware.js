const jwt = require('jsonwebtoken');

const authenticationToken = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;
        if (token) {
            jwt.verify(token, 'my-secret-key-is-2001', (err) => {
                // jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    console.log(err)
                    res.redirect('/Login')
                } else {
                    next();
                }
            })
        } else {
            res.redirect('/Login')
        }
        // req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET).userId);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            succeded: false,
            message: "Not Authorized",
            error : error
        })
    }
}
module.exports = {
    authenticationToken
}