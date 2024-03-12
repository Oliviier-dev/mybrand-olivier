import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';
import messageRoutes from './routes/messagesRoutes';
import commentsRoutes from './routes/commentsRoutes';
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
import YAML from "yamljs";
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load("./src/config/swagger.yaml");
import dotenv from "dotenv";

// CONFIGURE DOTENV
dotenv.config();

export const app: Application = express();
const PORT = process.env.PORT || 3000

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api/blog', blogRoutes);
app.use('/api', messageRoutes);
app.use('/api', commentsRoutes);
app.use('/api/auth',authRoutes);

// Error handling middleware
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(err); // To see properties of message in our console
    res.status(422).send({ error: err.message });
});

//connecting to db
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})