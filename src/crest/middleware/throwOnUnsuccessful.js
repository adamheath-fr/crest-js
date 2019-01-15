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
            let errorMessage;
            let errorStatusMessage = response.statusText;

            /* eslint-disable promise/always-return, promise/catch-or-return, promise/no-nesting */
            return response.json().then(({ message, reason }) => {
                errorMessage = message;
                if (reason) { errorStatusMessage = reason; }
            }).finally(() => {
                throw new CRESTError(response.url, response.status, errorStatusMessage, errorMessage);
            });
            /* eslint-enable */
        }

        return response;
    });
};

export default throwOnUnsuccessful;
