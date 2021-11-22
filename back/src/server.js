const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envPATH = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPATH)) {
    console.log("It's required a .env file");
    process.exit(1);
}

dotenv.config({
    path: envPATH
});

const app = express();

const staticFile = path.resolve(__dirname, '../public/');

app.use(express.static(staticFile));


module.exports = app;