/**
 * Creates a new instance of Headers.
 * @module crest/fetch/createHeaders
 * @param {Object} headers An object containing any HTTP headers that you want to pre-populate your Headers object with.
 * @returns {Headers} A new instance of Headers.
 */
const createHeaders = (headers) => {
    return new Headers({
        "Accept": "application/json",
        "X-Requested-With": "ForgeRock CREST.js",
        ...headers
    });
};

export default createHeaders;
