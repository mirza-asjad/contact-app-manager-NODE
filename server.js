const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConnection');
const { validToken } = require('./middlewares/tokenValidatorHandler');
const dotenv = require('dotenv').config();   //why here is config() method?
//devDependency vs Dependency

const app = express();

connectDB();

const port = process.env.PORT || 5000;  //why we set port 5000 here?

//moving this part to routes files for cleaner code
/*
app.get('/api/contacts', (req, res) => {
    res.status(200).json({
        message: 'Your First Api Request'
    });
});
*/


//middle for decoding ig
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));



//why we used 'used' here and why there is a requring of the file?
app.use('/api/contacts', require('./routes/contactRoutes'));


app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});