import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

//api endpoint that we can connect that we can hook onto from our frontend side
app.use('/api/v1/posts',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/', async(req,res)=>{
    res.send('Hello world');
})


app.listen(8000, ()=>{
    connectDB(process.env.MONGODB_URL)
    console.log('Server has started on port http://localhost:8000')
})


