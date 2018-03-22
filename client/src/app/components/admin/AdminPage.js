import React from "react";
import AddCity from "./AddCity";
import DeactivateCity from "./DeactivateCity";
import ActivateCity from "./ActivateCity";

export default class AdminPage extends React.Component {

    constructor() {
        super();
        this.state = {
            activatedCities: null,
            activatedCitiesFetchError: false,
            deactivatedCities: null,
            deactivatedCitiesFetchError: false
        };
        this.fetchActivatedCities();
        this.fetchDeactivatedCities();
    };

    fetchActivatedCities = () => {
        fetch('/api/city/activated').then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({ activatedCities: json });
        }).catch((err) => {
            this.setState({ activatedCitiesFetchError: true });
        });
    };

    fetchDeactivatedCities = () => {
        fetch('/api/city/deactivated').then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({ deactivatedCities: json });
        }).catch((err) => {
            this.setState({ deactivatedCitiesFetchError: true });
        });
    };

    swapCity = (src, dst, cityId) => {
        let foundCity = src.reduce((foundCity, city, index) => {
            if (city.id == cityId) {
                return {index, city};
            }
            return foundCity;
        }, undefined);

        if (foundCity) {
            src.splice(foundCity.index, 1);
            dst.push(foundCity.city);
        }

        return({src, dst});
    }

    activatedTodeactivated = (cityId) => {
        let swapped = this.swapCity(this.state.activatedCities, this.state.deactivatedCities, cityId);
        this.setState({activatedCities: swapped.src, deactivatedCities: swapped.dst});
    };

    deactivatedToActivated = (cityId) => {
        let swapped = this.swapCity(this.state.deactivatedCities, this.state.activatedCities);
        this.setState({deactivatedCities: swapped.src, activatedCities: swapped.dst});
    };

    addCity = (city) => {
        let activated = this.state.activatedCities;
        activated.push(city);
        this.setState({activatedCities: activated});
    };

    render = () => {
        return (
            <div>
                <AddCity addCity={this.addCity.bind(this)}/>
                {!this.state.activatedCitiesFetchError ?
                    <DeactivateCity activatedCities={this.state.activatedCities}
                        activatedTodeactivated={this.activatedTodeactivated.bind(this)} />
                    :
                    <p>Api error</p>
                }
                {!this.state.deactivatedCitiesFetchError ?
                    <ActivateCity deactivatedCities={this.state.deactivatedCities}
                        deactivatedToActivated={this.deactivatedToActivated.bind(this)} />
                    :
                    <p>Api error</p>
                }

            </div>
        )
    }
}