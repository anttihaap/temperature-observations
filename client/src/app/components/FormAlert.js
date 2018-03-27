import React from "react";
import { SuccessfullSubmissionStatus, FailedSubmissionStatus } from "./SubmissionStatus";

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

        const submissionStatus = this.props.submissionStatus;

        if (submissionStatus == null || submissionStatus == undefined) {
            return (<div></div>);
        }

        if (submissionStatus.isSuccessful()) {
            return (
                <SuccessAlert successMessage={submissionStatus.getSuccessMessage()} />
            );
        } else if (!submissionStatus.isSuccessful()) {
            return (
                <div>
                    {submissionStatus.getErrorMessages().map((errorMessage) => {
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