const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./rouer');

const uri = process.env.MONGO_URL;
mongoose.connect(uri);

// app 
const app = express()
app.use(morgan('combined'));
app.use(bodyParser.json({ 'type': '*/*' }));
routes(app);

//server
const PORT = process.env.PORT || 8000
const server = http.createServer(app);
server.listen(PORT);
console.log('Listning on port : ', PORT);
