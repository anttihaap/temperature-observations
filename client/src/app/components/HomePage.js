import React from "react";

import CityTempBlock from "./CityTemperatures";
import AddTempObs from "./AddTempObs";

export default class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            apiFetchError: false,
            temperatures: []
        };
    }

    //Updates added temperature in client
    updateTempsLocally = (newObs) => {
        var temperatures = this.state.temperatures.slice();
        temperatures.forEach((city, index) => {
            if (city.id == newObs.city_id) {
                temperatures[index].latest = newObs.temp;
                if (city.min > newObs.temp || city.min == null) temperatures[index].min = newObs.temp;
                if (city.max < newObs.temp || city.max == null) temperatures[index].max = newObs.temp;
            }
        });
        this.setState({ temperatures: temperatures });
    }

    componentDidMount = () => {
        fetch('/api/temperatures').then(response => {
            if (response.status != 200) throw err;
            return response.json();
        }).then(json => {
            this.setState({ temperatures: json });
        }).catch(error => {
            this.setState({ error: true, temperatures: null });
        });
    }

    render = () => {
        //TODO: not in use ATM!?
        const error = this.state.apiFetchError;

        return (
            <div className="content">
                <CityTempBlock temperatures={this.state.temperatures} />
                <AddTempObs temperatures={this.state.temperatures} updateTempsLocally={this.updateTempsLocally.bind(this)} />
            </div>
        )
    };

}