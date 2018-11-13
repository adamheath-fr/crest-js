import CRESTError from "../errors/CRESTError";

/**
 * Throws an error when given a failed response.
 * @module crest/middleware/throwFailedResponse
 * @param {Response} response An instance of Response.
 * @param {Object} json Parsed JSON from response.
 * @returns {Object} The parsed response.
 * @throws {CRESTError} Thrown when the response status was not in the 2xx range.
 */
const throwFailedResponse = (response, json) => {
    return Promise.all([response, json]).then(([response, json]) => {
        if (!response.ok) {
            const statusMessage = json && json.reason ? json.reason : response.statusText;
            const message = json ? json.message : undefined;
            throw new CRESTError(response.url, response.status, statusMessage, message);
        }

        return json;
    });
};

export default throwFailedResponse;
