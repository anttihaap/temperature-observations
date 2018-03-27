class SubmissionStatus {
    
    constructor(success, successMessage, errorMessages) {
        this.success = success;
        this.successMessage = successMessage;
        this.errorMessage = errorMessages;
    }

    isSuccessful() {
        return this.success;
    }

    getSuccessMessage() {
        return this.successMessage;
    }

    getErrorMessages() {
        return this.errorMessage;
    }
    

}

class SuccessfulSubmissionStatus extends SubmissionStatus {
    
    constructor(successMessage) {
        super(true, successMessage, null);
    }

}

class FailedSubmissionStatus extends SubmissionStatus {

    constructor(errorMessages) {
        super(false, null, errorMessages);
    }

}

module.exports = { SubmissionStatus, SuccessfulSubmissionStatus, FailedSubmissionStatus }