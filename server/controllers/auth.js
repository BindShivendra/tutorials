const User = require('../models/user');

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
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
            res.status(200).send({ success: true })
        })
    })

}