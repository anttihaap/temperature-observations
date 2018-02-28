import React from "react";
import { post } from "../../util/PostToApi";
import { FormAlert } from "../FormAlert";
import { getToken, logOut } from "../../util/Authentication";

export default class ActivateCity extends React.Component {

    constructor() {
        super();
        this.state = {
            deactivated: null,
            formStatus: {
                redirectHome: false,
                success: null,
                successMessage: null,
                errorMessages: null
            }
        }
    }

    setFormStatus = (success, successMessage, errorMessages) => {
        this.setState({formStatus: {success, successMessage, errorMessages}});
    }

    activateCity = (event) => {
        event.preventDefault();
        var city_id = Number(this.refs.selectedCity.value);

        post('/api/city/activate', {
            city_id: city_id,
            token: getToken()
        }).then((res) => {
            if (res.ok) {
                this.setFormStatus(true, {strong: 'City activated', message: ''}, null);
                this.props.deactivatedToActivated(city_id);
                this.clearForm();
            } else if (res.status == 403) {
                logOut();
                this.setState({redirectHome: true});
            } else {
                this.setFormStatus(false, null, [{strong: 'API error', message: 'status: ' + res.status}])
            }
        }).catch((err) => {
            this.setFormStatus(false, null, [{strong: 'API error', message: err.message}])
        });
    }

    clearForm = () => {
        this.refs.selectedCity.value = '';
    }

    render = () => {
        const deactivated = this.props.deactivatedCities;
        return (
            <div className="form">
                <form onSubmit={this.activateCity.bind(this)}>
                    <h2>Activate city:</h2>
                    <div className="form-group">
                        <label htmlFor="cities">City:</label>
                        <select ref="selectedCity" className="custom-select my-1 mr-sm-2" id="cities" data-cip-id="cIPJQ342845639">
                            <option value=''>Choose...</option>
                            {deactivated && deactivated.map((city, index) => {
                                return (<option value={city.id} key={'d' + city.id}>{city.name}</option>)
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <FormAlert formStatus={this.state.formStatus} />
                    {this.state.redirectHome && <Redirect to='/'/>}
                </form>
            </div>
        )
    }
}