/**
 * Creates a string that can be used in a request body.
 * <p>Removes _rev and _type attributes from the body before stringifying.</p>
 * @module crest/v2/createBody
 * @param {object} body Object to create body from.
 * @returns {string} Stringified body.
 */
const createBody = (body) => {
    const newBody = Object.assign({}, body);
    delete newBody._rev;
    delete newBody._type;
    return JSON.stringify(newBody);
};

export default createBody;
