import mongoose from 'mongoose';

const connectDB = (url) => {

    console.log("URL:",url)
    mongoose.set('strictQuery', true);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log('Connection error:', err));
};

export default connectDB;



