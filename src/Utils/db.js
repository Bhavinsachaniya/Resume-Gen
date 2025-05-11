const mongoose = require('mongoose');

const connectDB = async () => {
        const conn = await mongoose.connect(process.env.mongo_db)
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err)); 
};

module.exports = connectDB;