import ParseError from "../errors/ParseError";

/**
 * Parses a Response as JSON.
 * @module crest/middleware/parseResponse
 * @param {Response} response An instance of Response.
 * @returns {Object} The parsed response.
 * @throws {ParseError} Thrown when parsing was unable to complete.
 */
const parseResponse = (response) => {
    return response.then((response) => response.json()).catch((error) => {
        throw new ParseError(error);
    });
};

export default parseResponse;
