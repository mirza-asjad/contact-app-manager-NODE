const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, userpassword } = req.body;

    if (!username || !email || !userpassword) {
        res.status(400);
        throw new Error('Please provide username, email, and password');
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);
    console.log('Hashed Password ->', hashedPassword);

    const user = await User.create({        
        username,
        email,
        userpassword: hashedPassword,
    });

    console.log('User Created ->', user);

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, userpassword } = req.body;

    // Check if email and password are provided
    if (!email || !userpassword) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and passwords match
    if (user && (await bcrypt.compare(userpassword, user.userpassword))) {
        // Generate access token
        const accessToken = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with user info and access token
        res.status(200).json({
            accessToken,
        });
    } else {
        // Invalid credentials
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});


module.exports = { registerUser, loginUser, getCurrentUser };

