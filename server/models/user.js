const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// Before save, encrypt password
userSchema.pre("save", function (next) {
    const user = this;
    // generate salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        // generate hash and assign to user password
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            user.password = hash;
            next()
        });
    });
});

//compare password
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch);
    });
}

const UserClass = mongoose.model('user', userSchema);

module.exports = UserClass;