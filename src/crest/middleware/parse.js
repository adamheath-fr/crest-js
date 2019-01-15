import ParseError from "../errors/ParseError";

/**
 * Parses a Response as JSON.
 * @module crest/middleware/parse
 * @param {Promise.<Response>} promise Promise from previous middleware.
 * @returns {Promise} Promise to pass to next middleware.
 * @throws {ParseError} Thrown when parsing was unable to complete.
 */
const parse = (promise) => {
    return promise.then((response) => {
        /* eslint-disable promise/no-nesting */
        return response.json().catch((error) => {
            throw new ParseError(error);
        });
        /* eslint-enable */
    });
};

export default parse;
