import React from "react";

const SuccessAlert = ({ successMessage }) => (
    <div className='alert alert-success' role="alert">
        <strong>{successMessage.strong}</strong> {successMessage.message}
    </div>
);

const DangerAlert = ({ errMessage }) => (
    <div className='alert alert-danger' role="alert" key={errMessage.strong + errMessage.message}>
        <strong>{errMessage.strong}</strong> {errMessage.message}
    </div>
);

export class FormAlert extends React.Component {

    render() {
        if (this.props.formStatus.success == true) {
            return (
                <SuccessAlert successMessage={this.props.formStatus.successMessage} />
            );
        } else if (this.props.formStatus.success == false) {
            return (
                <div>
                    {this.props.formStatus.errorMessages.map((errorMessage) => {
                        return (
                            <DangerAlert errMessage={errorMessage} />
                        );
                    })}
                </div>
            );
        } else {
            return (<div></div>);
        }
    };

}