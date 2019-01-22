/**
 * Returns a new (polyfilled) Promise.
 *
 * fetch().json() returns a non-Promise thenable, which cannot be polyfilled
 * (e.g. with #finally). This middleware ensures that the resulting Promise is
 * a (potentially) polyfilled Promise by returning a new Promise.
 * @see https://github.com/zloirock/core-js/issues/178
 * @see https://github.com/zloirock/core-js/issues/332
 * @see https://github.com/zloirock/core-js/issues/371
 * @module crest/middleware/newPromise
 * @param {Promise.<Response>} promise Promise from previous middleware.
 * @returns {Promise} Promise to pass to next middleware.
 * @throws {ParseError} Thrown when parsing was unable to complete.
 */
const newPromise = (promise) => {
    return Promise.resolve(promise);
};

export default newPromise;
