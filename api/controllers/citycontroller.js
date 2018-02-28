
var mongoose = require('mongoose');

var City = require('../models/city');

exports.findAll = (req, res) => {
  find({}, req, res);
};

exports.add = (req, res) => {
  var city_name = req.headers.name;
  if (!city_name || city_name.length === 0) {
    res.send.status(400).send({ message: 'Cant be blank' });
  } else {
    new City({ name: city_name, active: true }).save().then((city) => {
      res.send({id: city._id, name: city.name});
    }, (err) => {
      res.status(500).json({});
    });
  }
};

exports.deactivatedCities = (req, res) => {
  find({ active: false }, req, res);
};

exports.activatedCities = (req, res) => {
  find({ active: true }, req, res);
};

exports.deactivate = (req, res) => {
  setActiveState(false, req, res);
};

exports.activate = (req, res) => {
  setActiveState(true, req, res);
};

find = (query, req, res) => {
  City.find(query, (err, cities) => {
    if (err) {
      res.status(500).send({ error: 'Internal API error.' });
    } else {
      res.send(cities.map(function (city) {
        return ({ id: city._id, name: city.name });
      }));
    }
  });
};

setActiveState = (state, req, res) => {
  console.log(req.headers.city_id);
  var cityId = Number(req.headers.city_id);
  City.findOneAndUpdate({ _id: cityId, active: !state }, { active: state }, (err, city) => { 
    if (err) {
      res.status(500).send({error: err});
    } else if (!city) {
      res.status(500).send({error: 'City not found'});
    } else {
      res.send({});
    }
  });
};
