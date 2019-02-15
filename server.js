// require express and other modules
const express = require('express');
const app = express();
// const db = require("./models");

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/


// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/coderkarma",
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [{
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        name: "Karma Drukpa",
        githubUserName: "coderkarma",
        githubLink: "https://github.com/coderkarma",
        description: "A Passionate Developer, who loves to solve the problems",
        projects: ["Omnifood", "todoList", "Monument"]
      },
      {
        // Grabbing all cars
        method: "GET",
        path: "/api/cars",
        description: "Get all cars"
      },
      {
        // Getting one car by id
        method: "GET",
        path: "/api/cars/:id",
        description: "Get a car"
      },
      {
        // Creating a new car 
        method: "POST",
        path: "/api/cars",
        description: " Create a new car"
      }
    ]
  })
});

//  Get the cars route
app.get('/api/cars', (req, res) => {
  // return all cars
  db.Car.find({
    make: "Tesla"
  }, (err, foundCars) => {
    if (err) return console.log(err);
    res.json(foundCars);
  })
});

//  Grabbing one car by id
app.get('/api/cars/:id', (req, res) => {
  // return all cars
  db.Car.findOne({
    _id: req.params.id
  }, (err, foundCar) => {
    res.json(foundCar);
  })
});

// Create new car 
app.post('/api/cars', (req, res) => {
  let newCar = req.body;
  console.log(newCar);
  db.Car.create(newCar, (err, newCar) => {
    if (err) return console.log(err);

    res.json(newCar);
  })

})

// PUT route
// find car and update it
// using find one and update method
app.put('/api/cars/:id', (req, res) => {
  let carId = req.params.id;

  db.Car.findOneAndUpdate({
      _id: carId,
    }, req.body, {
      new: true
    },
    (err, updateCar) => {
      if (err) return console.log(err);
      res.json(updateCar);
    }

  )
  //FIXME:  just did callback function rather then exceute

  // .exec((err, updatedCar) => {
  //   if (err) return console.log(err);
  //   res.json(updatedCar);
  // })

})


// Delete Route

app.delete("/api/cars/:id", (req, res) => {
  let deleteCarId = req.params.id;

  db.Car.findOneAndDelete({
    _id: deleteCarId
  }, (err, deletedCar) => {
    if (err) return console.log(err);
    res.json(deletedCar);
  })
})


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});