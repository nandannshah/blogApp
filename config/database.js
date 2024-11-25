const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then((console.log("DB connected")))
    .catch((error) => {
        console.log('Database not connnected');
        console.log(error);
        process.exit(1);
    })
};

module.exports = dbConnect;