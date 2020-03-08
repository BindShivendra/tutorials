const User = require('../models/user');
const jwt = require('jwt-simple');

function getToken(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: 'Please rovide Email and Password' })
    }
    User.findOne({ email: email }, function (error, userExists) {
        if (error) {
            return error
        }
        // email already exists , return error
        if (userExists) {
            return res.status(422).send({ error: 'user with email exist' })
        }
        // new email, create new objects 
        const user = new User({
            email: email,
            password: password
        })
        user.save(function (err) {
            if (err) {
                return next(err)
            }
            res.status(200).send({ Token: getToken(user) })
        })
    })

}

exports.sigin = function (req, res, next) {
    //user exists, provide tiken
    //passport assign authenticated user on request objects
    res.status(200).send({ Token: getToken(req.user) })

}