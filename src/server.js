'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');

const handleNotFound = require('./error-handlers/404.js');
const handleError = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');

const app = express();

app.use(cors());

app.get('/', logger, getHomePage);
app.get('/person', logger, validator , returnPerson);
app.get('/broken', logger, simulateError);
app.get("*", logger, handleNotFound);
app.use( handleError );


function returnPerson(req, res){

  let name = req.query.name;

  res.status(200).json({"name": name});
}


function getHomePage(req, res) {
  res.status(200).send("Hello World");
}

function simulateError(req, res, next) {
  error = new Error("Houston we have a problem");
  error.status = 500;
  next(error);
}

function start(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

module.exports = {app, start};