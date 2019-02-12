import CRESTError from "../errors/CRESTError";

/**
 * Throws an error when given an unsuccessful response.
 * @module crest/middleware/throwOnUnsuccessful
 * @param {Promise.<Response>} promise Promise from previous middleware.
 * @returns {Promise} Promise to pass to next middleware.
 * @throws {CRESTError} Thrown when the response status was not in the 2xx range.
 */
const throwOnUnsuccessful = (promise) => {
    return promise.then((response) => {
        if (!response.ok) {
            return response.json().then(({ message, reason }) => { // eslint-disable-line promise/no-nesting
                const statusMessage = reason ? reason : response.statusText;
                throw new CRESTError(response.url, response.status, statusMessage, message);
            }, () => {
                throw new CRESTError(response.url, response.status, response.statusText);
            });
        }

        return response;
    });
};

export default throwOnUnsuccessful;
