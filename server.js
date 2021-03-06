// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Create a local server
const server = app.listen(port, listening);

// Listening function
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Get method route
// Return data from projectData
app.get('/data', function (req, res) {
    res.send(projectData);
  })

// POST method route
// Assign data to projectData
app.post('/addUserData', function (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.content = req.body.content;

    res.send(projectData);
  })