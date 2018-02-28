import React from "react";
import { FormAlert } from "./FormAlert";
import { post } from "../util/PostToApi"

export default class AddTempObs extends React.Component {

    constructor() {
        super();
        this.state = {
            success: null,
            successMessage: null,
            errorMessages: null
        }
    }

    addObs(event) {
        //no refresh:
        event.preventDefault();

        //in string format
        var userInput = {
            city_id: this.refs.selectedCity.value,
            temp: this.refs.degrees.value
        }

        var errorMessages = this.validateInput(userInput);

        //cast to number after validitation
        userInput.city_id = Number(userInput.city_id);
        userInput.temp = Number(userInput.temp);

        //if there are errors set state and return from function
        if (errorMessages.length != 0) {
            this.setState({
                success: false,
                errorMessages: errorMessages
            })
            return;
        }

        fetch('/api/tempobs/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                city_id: userInput.city_id,
                temp: userInput.temp
            }
        }).then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
        }).then((res) => {
            this.setState({
                success: true,
                successMessage: {
                    strong: 'Added temperature!',
                    message: ''
                }
            });
            this.clearInputFields();
            this.props.updateTempsLocally(userInput);
        }).catch((err) => {
            this.setState({
                success: false,
                errorMessages: [
                    {
                        strong: 'API error!',
                        message: err.message
                    }
                ]
            })
        });
    };

    validateInput(userInput) {
        var errorMessages = [];

        //Check if city is selected:
        if (userInput.city_id == '') {
            errorMessages.push({
                strong: 'Select a city!',
                message: ''
            });
        }

        //Check if temperature is a number:
        if (!/[-.0-9]+/.test(userInput.temp)) {
            errorMessages.push({
                strong: 'Temperature has to be a number!',
                message: ''
            });
        } else {
            //Check if value is in the right range from -60 to 60 degs
            console.log(Number(userInput.temp));
            if (!(Number(userInput.temp) >= -60 && Number(userInput.temp) <= 60)) {
                errorMessages.push({
                    strong: 'Temperature has to be greather than -60 and less than 60',
                    message: ''
                });
            }
        }
        return errorMessages;
    }

    clearInputFields() {
        this.refs.selectedCity.value = '';
        this.refs.degrees.value = '';
    }

    render() {

        const temperatures = this.props.temperatures;

        return (
            <div className="form">
                <h3>Add temperature observation:</h3>
                <form onSubmit={this.addObs.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="cities">City:</label>
                        <select ref="selectedCity" className="custom-select my-1 mr-sm-2" id="cities" data-cip-id="cIPJQ342845639">
                            <option value=''>Choose...</option>
                            {temperatures && temperatures.map((city, index) => {
                                return (<option value={city.id} key={index}>{city.name}</option>)
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="degrees">Temperature:</label>
                        <input ref="degrees" type="degrees" className="form-control" id="degrees" placeholder="Temperature"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                <FormAlert formStatus={this.state} />
            </div>
        );
    };
}