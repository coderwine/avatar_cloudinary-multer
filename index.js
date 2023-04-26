require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongo = process.env.MONGODB;

// Import Controller
const userController = require('./user.controller')

mongoose.set('strictQuery', false);
mongoose.connect(mongo);
const db = mongoose.connection;
db.once('open', () => console.log(`Connected: ${mongo}`));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
});

// Route
app.use('/user', userController);

app.listen(port, console.log(`Running on port: ${port}`));