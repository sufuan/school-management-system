const express = require('express');
require('dotenv').config()
const { readdirSync } = require('fs')
const cors = require('cors');
const ConnectDB = require('./config/db');



const app = express();
app.use(express.json());

app.use(cors());

ConnectDB();



readdirSync('./route').map(r => app.use('/', require('./route/' + r)))


const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server running on port ${port}`));
