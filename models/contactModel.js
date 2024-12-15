const mongoose = require('mongoose');

//create a simple schema 
const ContactSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Required user association
    name:
    {
        type: String,
        required: [true, 'Please provide name'],

    }
    ,
    email:
    {
        type: String,
        required: [true, 'Please provide email'],
    }
    ,
    phone:
    {
        type: String,
        required: [true, 'Please provide phone'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);