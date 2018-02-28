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

    activatedTodeactivated = (cityId) => {
        var deactivated = this.state.deactivatedCities;
        var activated = this.state.activatedCities;
        let found = null;
        let foundIndex = null;
        activated.forEach((city, index, arr) => {
            if (city.id == cityId) {
                found = city;
                foundIndex = index;
            }
        });
        if (found) {
            activated.splice(foundIndex, 1);
            deactivated.push(found);
            this.setState({ deactivatedCities: deactivated, activatedCities: activated });
        }
    };

    deactivatedToActivated = (cityId) => {
        var deactivated = this.state.deactivatedCities;
        var activated = this.state.activatedCities;
        let found = null;
        let foundIndex = null;
        deactivated.forEach((city, index, arr) => {
            if (city.id == cityId) {
                found = city;
                foundIndex = index;
            }
        });
        if (found) {
            deactivated.splice(foundIndex, 1);
            activated.push(found);
            this.setState({ deactivatedCities: deactivated, activatedCities: activated });
        }
    };

    addCity = (city) => {
        var activated = this.state.activatedCities;
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