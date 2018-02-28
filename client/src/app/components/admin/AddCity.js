import React from "react";
import { FormAlert } from "../FormAlert";
import { Redirect } from "react-router-dom";

import { post } from "../../util/PostToApi";
import { logOut } from "../../util/Authentication";

export default class AddCity extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            formStatus: {
                success: null,
                successMessage: null,
                errorMessages: null
            }
        }
    }

    setFormStatus = (success, successMessage, errorMessages) => {
        this.setState({formStatus: {success, successMessage, errorMessages}});
    }

    addCity = (event) => {
        event.preventDefault();
        var cityName = this.refs.cityName.value;
        var headers = {
            name: cityName,
            token: localStorage.getItem('token')
        }
        post('/api/city/add', headers).then((res) => {
            if (res.ok) {
                this.setFormStatus(true, {strong: 'City added!', message: ''}, null);
                this.props.addCity(res.jsonData);
                this.clearForm();
            } else if (res.status == 403) {
                logOut();
                this.setState({redirectHome: true});
            } else {
                this.setFormStatus(false, null, [{strong: 'API error!', message: ''}]);
            }
        }).catch((err) => {
            this.setFormStatus(false, null, [{strong: 'Error!', message: err.message}]);
        });
    }

    clearForm = () => {
        this.refs.cityName.value = '';
    }

    render = () => {
        return (
            <div className="form">
                <form onSubmit={this.addCity.bind(this)}>
                    <h2>Add a new city</h2>
                    <div className="form-group">
                        <label htmlFor="city_name">City:</label>
                        <input ref="cityName" type="name" className="form-control" id="city_name" placeholder="Name"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                    {this.state.redirect && (
                        <Redirect to="/" />
                    )}
                    <FormAlert formStatus={this.state.formStatus}/>
                </form>
            </div>
        )
    }
}