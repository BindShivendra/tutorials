const passport = require('passport');

const Auth = require('./controllers/auth');
const passportService = require('./services/passport');

const isAuthenticated = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
    app.get('/', isAuthenticated, function (req, res, next) {
        res.send({ success: true })
    })
    app.post('/signin', requireSignin, Auth.sigin)
    app.post('/signup', Auth.signup)
}