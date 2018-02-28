import React from "react";
import { Link } from "react-router-dom";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { isLoggedIn } from "../../util/Authentication.js";

export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    toggleRender = () => {
        this.setState(this.state);
    };

    render = () => {
        return (
            <div id="header" className="card-header">
                <div className="row row-eq-height">
                    <div className="col-md-8 text-align-left">
                        <h1>Temperatures</h1>
                    </div>
                    <div className="col">
                        <div className="float-right vertical-center nav-buttons btn-toolbar">
                            {isLoggedIn() ? (
                                <div>
                                    <Link className="btn btn-primary button" to='/'>Home</Link>
                                    <Link className="btn btn-primary button" to='/admin'>Admin</Link>
                                    <LogoutButton renderHeader={this.toggleRender.bind(this)} />
                                </div>
                            ) : (
                                    <LoginButton renderHeader={this.toggleRender.bind(this)} />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}