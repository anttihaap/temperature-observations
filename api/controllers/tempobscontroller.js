var mongoose = require('mongoose');
var TempObs = require('../models/tempobs');
var City = require('../models/city');

exports.add = (req, res) => {
  var temp = req.headers.temp;
  if (!tempIsValid(temp)) {
    res.status(500).send({ error: 'Temp should be a number [-60,60]' });
  } else {
    var obsQuery = {
      city_id: Number(req.headers.city_id),
      temp: Number(req.headers.temp),
      date: new Date()
    };
    var newObs = new TempObs(obsQuery);
    newObs.save().then(() => {
      res.json({ message: "ok" });
    }).catch((err) => {
      res.status(500).json(err.message);
    });
  }
}

exports.temperatures = (req, res) => {
  City.find({ active: true }).then((cities) => {
    var queryList = [];
    cities.forEach((city) => {

      let city_id = city._id;
      let city_name = city.name;

      var query = Promise.all([
        //latest temp
        TempObs.findLatestByCityId(city._id).exec(),
        //max temp
        TempObs.findMaxPastDayByCityId(city._id).exec(),
        //min temp
        TempObs.findMinPastDayByCityId(city.id).exec()
      ]).then(([latestObs, maxObs, minObs]) => {
        return ({
          id: city_id,
          name: city_name,
          latest: ((latestObs == null) ? null : latestObs.temp),
          min: ((minObs == null) ? null : minObs.temp),
          max: ((maxObs == null) ? null : maxObs.temp)
        });
      });
      queryList.push(query);
    });

    return Promise.all(queryList);

  }).then((results) => {
    res.send(results);
  });
}

exports.cityobservations = (req, res) => {
  TempObs.find({ city_id: req.headers.city_id }).exec().then((obs) => {
    obs.forEach((val, index) => {
      obs[index] = { temp: val.temp, date: val.date };
    })
    res.send(obs);
  }).catch((err) => {
    res.status(500).send({ error: err.message });
  });
}

/**
 * Is a number and in range [-60, 60]
 */
tempIsValid = (temp) => {
  return (/[-.0-9]+/.test(temp) && Number(temp) >= -60 && Number(temp) <= 60);
};
