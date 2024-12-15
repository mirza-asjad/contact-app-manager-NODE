const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        // Extract token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            // Attach decoded user to the request object
            req.user = decoded;
            next();
        });
    } else {
        // If no token is provided or invalid header format
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = { validToken };
