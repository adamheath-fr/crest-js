import invokeFetch from "./fetch/invokeFetch";
import parse from "./middleware/parse";
import throwOnUnsuccessful from "./middleware/throwOnUnsuccessful";

/**
 * Middleware to apply to a CREST resource.
 * @callback middleware
 * @param {Promise} promise Promise from previous middleware.
 * @returns {Promise} Promise to pass to next middleware.
 */

/**
 * Creates a function that initiates a CREST request.
 * <p>The request will be preconfigured for the given protocol and resource versions.</p>
 * @module crest/createRequest
 * @param {string} protocolVersion CREST protocol version.
 * @param {string} resourceVersion Resource version.
 * @param {middleware[]} middleware Middleware.
 * @returns {function} Function that initiates a CREST request.
 * The returned function's signature parameters exactly match that of
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch|fetch()}.
 */
const createRequest = (protocolVersion, resourceVersion, middleware) => (input, { headers, ...options } = {}) => {
    const promise = invokeFetch(input, {
        ...options,
        headers: {
            ...headers,
            "Accept-API-Version": `protocol=${protocolVersion},resource=${resourceVersion}`
        }
    });

    return [
        throwOnUnsuccessful,
        parse,
        ...middleware
    ].reduce((previousPromise, func) => func(previousPromise), promise);
};

export default createRequest;
