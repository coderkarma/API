const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/personal-api", {
    useNewUrlParser: true
});

module.exports.Car = require("./cars");
// module.exports.Campsite = require("./campsite.js.example");