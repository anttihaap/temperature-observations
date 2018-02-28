import React from "react";

const CityBlockContent = ({ city }) => {
  var cityLatestValue = city.latest ? (city.latest + "°") : ("No obs.");
  var cityMinValue = city.min ? (city.min + "°C") : ("°C");
  var cityMaxValue = city.max ? (city.max + "°C") : ("°C");

  return (
    <div>
      <p className="city">{city.name}</p>
      <p className="city-temp">{cityLatestValue}</p>
      <div className="last24">
        <p className="last24-title">Last 24h</p>
        <p className="warmest"> Warmest: <span className="temp">{cityMaxValue}</span></p>
        <p className="coldest">Coldest: <span className="temp">{cityMinValue}</span></p>
      </div>
    </div>
  );
};

const CityTemperatures = ({ temperatures }) => {

  return (
    temperatures == null ? (
      <p>Couldn't fetch data from api.</p>
    ) : (
        <div className="row justify-content-md-middle">
          {temperatures.map((city) => (
            <div key={city.id.toString()} className="col-md-3">
              <CityBlockContent city={city} />
            </div>
          ))}
        </div>
      )

  )
};

export default CityTemperatures;
