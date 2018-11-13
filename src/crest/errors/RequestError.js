/**
 * Representation of a request error.
 * <p>Thrown when a request was unable to complete, for example, network failure.</p>
 */
class RequestError extends Error {
    /**
     * Creates a new instance.
     * @param {string} message Human-readable description of the error.
     */
    constructor (message) {
        super();

        this.message = message;
    }
}

export default RequestError;
