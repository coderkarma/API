const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: String,
    model: String,
    colors: String,
    electric: Boolean
    // you should fill the rest of this in
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;