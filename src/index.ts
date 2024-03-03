import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blogRoutes';
import messageRoutes from './routes/messagesRoutes';
import commentsRoutes from './routes/commentsRoutes';
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
import dotenv from "dotenv";


// CONFIGURE DOTENV
dotenv.config();

const app: Application = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mybrand').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/blog', blogRoutes);
app.use('/', messageRoutes);
app.use('/', commentsRoutes);
app.use(authRoutes);


//cookies
// app.get('/set-cookies', (req, res) => {
//     //res.setHeader('set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     res.send('you got cookies');
// });

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// });

// Error handling middleware
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(err); // To see properties of message in our console
    res.status(422).send({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on  port ${PORT}`);
});
