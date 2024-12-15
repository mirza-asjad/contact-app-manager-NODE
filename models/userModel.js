const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a user_id'],
        ref: "User",
        default: () => new mongoose.Types.ObjectId(), // Use the `new` keyword here
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Email already exists'],
    },
    userpassword: {
        type: String,
        required: [true, 'Please provide a password'],
    },

},
    {
        timestamps: true,
    }
);


exports.User = mongoose.model('User', userSchema);