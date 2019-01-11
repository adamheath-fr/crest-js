import URI from "urijs";

/**
 * Appends a query string to a URL.
 * @module utils/url/appendQueryString
 * @param {string} url URL to append to.
 * @param {Object} queryString Additional query string.
 * @returns {string} URL with query string appended.
 */
const appendQueryString = (url, queryString) => {
    const uri = new URI(url);

    uri.search(queryString);

    return uri.toString();
};

export default appendQueryString;
