import express from "express";
import cors from 'cors';
import DotEnv from 'dotenv';
import productsRoutes from './routes/products.js';
import * as authControllers from './controllers/auth.controller.js';
import mongoose from "mongoose";

const App = express();

DotEnv.config();

App.use(express.json());

App.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

App.use('/products', productsRoutes);
App.post('/register', authControllers.userRegister);
App.post('/login', authControllers.userLogin);
App.post('/auth', authControllers.checkAuth);

App.use('/public', express.static('public'));

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
.then(() => {
    App.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
})
.catch(err => console.log(err));