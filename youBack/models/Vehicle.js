const mongoose = require('mongoose');
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
  tipe: String,
  image: String,
  weight: Number,
  order: Number
}, {
  timestamps: true
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle;