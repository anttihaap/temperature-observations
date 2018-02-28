import React from "react";

import { FormAlert } from "../FormAlert";
import { isTokenExpired  } from "../../util/Authentication";
import { post } from "../../util/PostToApi";

export default class LoginButton extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            success: null,
            successMessage: null,
            errorMessages: null
        }
    }

    login(event) {
        event.preventDefault();
        var loginData = {
            name: this.refs.username.value,
            password: this.refs.password.value
        }

        post('/api/login', {
            name: loginData.name,
            password: loginData.password
        }).then((res) => {
            if (res.ok) {
                //Do login
                localStorage.setItem('token', res.jsonData.token);
                this.props.renderHeader();
            } else if (res.status == 403) {
                this.setState({
                    success: false,
                    errorMessages: [
                        {strong: '', message: 'Username or password wrong.'}
                    ]
                });
            } else {
                this.setState({
                    success: false,
                    errorMessages: [
                        {strong: 'API FAIL', message: res.status}
                    ]
                });
            }
        }).catch((res) => {
            this.setState({
                success: false,
                errorMessages: [
                    {strong: 'Error occured!', message: ''}
                ]
            });
        });
    }

    render() {
        return (
            <div className="dropdown align-self-end">
                <button className="button btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    Log in</button>
                <div className="dropdown-menu p-4">
                    <form onSubmit={this.login.bind(this)}>
                        <div className="form-group dropdown">
                            <label htmlFor="username">Username</label>
                            <input ref="username" type="username" className="form-control" id="username" placeholder="Username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref="password" type="password" className="form-control" id="password" placeholder="Password"></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <FormAlert formStatus={this.state} />
                    </form>
                </div>
            </div>
        );
    }
}