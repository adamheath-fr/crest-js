/**
 * Representation of a parse error.
 * <p>Thrown when a response body failed to parse as JSON.</p>
 */
class ParseError extends Error {
    /**
     * Creates a new instance.
     * @param {string} message Human-readable description of the error.
     */
    constructor (message) {
        super();

        this.message = message;
    }
}

export default ParseError;
