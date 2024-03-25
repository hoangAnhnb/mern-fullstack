import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import posts from './routers/posts.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

const URI = "mongodb+srv://admin:sguWL3GsQeW8s8UC@cluster0.bkj9mpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts', posts);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });