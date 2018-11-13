/**
 * Representation of a CREST error.
 * <p>Thrown when a request responded with a CREST error.</p>
 */
class CRESTError extends Error {
    /**
     * Creates a new instance.
     * @param {string} url URL of the response.
     * @param {number} status HTTP response status code of the response.
     * @param {string} statusMessage Status message corresponding to the HTTP response status code.
     * @param {string} [message] Human-readable description of the error.
     */
    constructor (url, status, statusMessage, message) {
        super();

        this.url = url;
        this.status = status;
        this.statusMessage = statusMessage;
        this.message = message;
    }
}

export default CRESTError;
