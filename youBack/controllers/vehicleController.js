const Vehicle = require('../models/Vehicle');

var findAll = (req, res) => {
    Vehicle.find({}).sort('order')
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
  
  var createData = (req, res) => {
    Vehicle.find({}).sort('-createdAt')
    .then(result => {
        let newOrder = result.length < 1 ? 1 : result[0].order+1 
        Vehicle.create({
          tipe: req.body.tipe,
          image: req.body.image,
          weight: req.body.weight,
          order: newOrder
        })
        .then(result => res.send(result))
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  }

  module.exports = {
    findAll, createData
  }