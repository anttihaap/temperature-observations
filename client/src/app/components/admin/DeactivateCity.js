import React from "react";
import { post } from "../../util/PostToApi";
import { FormAlert } from "../FormAlert";
import { SuccessfulSubmissionStatus, FailedSubmissionStatus } from "../SubmissionStatus";
import { getToken, logOut } from "../../util/Authentication";
import { Redirect } from "react-router-dom";

export default class DeactivateCity extends React.Component {

    constructor() {
        super();
        this.state = {
            submissionStatus: null,
            redirectHome: false
        }
    }

    deactivateCity(event) {
        event.preventDefault();
        var city_id = Number(this.refs.selectedCity.value);

        post('/api/city/deactivate', {
            city_id: city_id,
            token: getToken()
        }).then((res) => {
            if (res.ok) {
                this.setState({submissionStatus: new SuccessfulSubmissionStatus(
                    {strong:'City deactivated', message:''}
                )});
                this.props.activatedTodeactivated(city_id);
                this.clearInputFrields();
            } else if (res.status == 403) {
                logOut();
                this.setState({redirectHome: true});
            } else {
                this.setState({submissionStatus: new FailedSubmissionStatus([
                    {strong: 'API error!', message: err.message}
                ])});
            }
        }).catch((err) => {
            this.setState({submissionStatus: new FailedSubmissionStatus(
                [{strong: 'Error!', message: err.message}]
            )})
        });
    }

    clearInputFrields() {
        this.refs.selectedCity.value = '';
    }

    render() {
        const activated = this.props.activatedCities;
        return (
            <div className="form">

                <form onSubmit={this.deactivateCity.bind(this)}>
                    <h2>Deactivate city:</h2>
                    <div className="form-group">
                        <label htmlFor="cities">City:</label>
                        <select ref="selectedCity" className="custom-select my-1 mr-sm-2" id="cities" data-cip-id="cIPJQ342845639">
                            <option value=''>Choose...</option>
                            {activated && activated.map((city, index) => {
                                return (<option value={city.id} key={'a' + city.id}>{city.name}</option>)
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <FormAlert submissionStatus={this.state.submissionStatus} />
                    {this.state.redirectHome && <Redirect to='/'/>}
                </form>

            </div>
        )
    }
}