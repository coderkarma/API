// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

const fordCar = {
    make: "Tesla",
    model: "2020",
    colors: "White",
    electric: true
}
//  creating new car data
db.Car.create(fordCar, (err, fordCar) => {
    if (err) return console.log(`Error: ${err}`);
    console.log(`Created new fordCar ${fordCar}`);
})


// 
// const new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })