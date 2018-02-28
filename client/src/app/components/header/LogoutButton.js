import React from "react";
import { logOut } from "../../util/Authentication";

export default class LogoutButton extends React.Component {

    logout = (e) => {
        logOut();
        this.props.renderHeader();
    };

    render = () => {
        return(
            <button className="btn btn-info button" onClick={this.logout.bind(this)} type="submit">LogOut</button>
        );
    };

}