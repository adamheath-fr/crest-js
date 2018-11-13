import URI from "urijs";

/**
 * Appends a path component to a URL.
 * @module utils/url/appendPathComponent
 * @param {string} url URL to append to.
 * @param {string} pathComponent Path component to append.
 * This must not be a hierarchical path (no "/") and will be URL encoded before being appended.
 * @returns {string} URL with path component appended.
 */
const appendPathComponent = (url, pathComponent) => {
    const newURI = new URI(url);

    const encodedPathComponent = URI.encode(pathComponent);
    const path = URI.joinPaths(newURI.path(), encodedPathComponent);
    newURI.path(path);

    return newURI.toString();
};

export default appendPathComponent;
