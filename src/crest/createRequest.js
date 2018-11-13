import invokeFetch from "./fetch/invokeFetch";
import parseResponse from "./middleware/parseResponse";
import throwFailedResponse from "./middleware/throwFailedResponse";

/**
 * Creates a function that initiates a CREST request.
 * <p>The request will be preconfigured for the given protocol and resource versions.</p>
 * @module crest/createRequest
 * @param {string} protocolVersion CREST protocol version.
 * @param {string} resourceVersion Resource version.
 * @returns {function} Function that initiates a CREST request.
 * The returned function's signature parameters exactly match that of
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch|fetch()}.
 */
const createRequest = (protocolVersion, resourceVersion) => (input, { headers, ...options } = {}) => {
    const response = invokeFetch(input, {
        ...options,
        headers: {
            ...headers,
            "Accept-API-Version": `protocol=${protocolVersion},resource=${resourceVersion}`
        }
    });

    const json = parseResponse(response);
    return throwFailedResponse(response, json);
};

export default createRequest;
