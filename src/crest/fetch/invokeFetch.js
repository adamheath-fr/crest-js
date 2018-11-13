import createHeaders from "./createHeaders";
import RequestError from "../errors/RequestError";

/**
 * Invokes {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch|fetch()}, applying standard behaviour.
 * @module crest/fetch/invokeFetch
 * @param {*} input See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|fetch() Parameters}.
 * @param {*} [init] See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|fetch() Parameters}.
 * @returns {Promise} See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Return_value|fetch() Return value}.
 * @throws {RequestError} Thrown when a request was unable to complete.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Exceptions|fetch() Exceptions}.
 */
const invokeFetch = (input, { headers, ...options } = {}) => {
    return fetch(input, {
        credentials: "same-origin",
        headers: createHeaders(headers),
        ...options
    }).catch((error) => {
        throw new RequestError(error);
    });
};

export default invokeFetch;
