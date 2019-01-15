import appendPathComponent from "../../utils/uri/appendPathComponent";
import createBody from "./createBody";
import createRequest from "../createRequest";
import appendQueryString from "../../utils/uri/appendQueryString";

/**
 * Representation of a CREST v2 resource.
 * @example
 * import { CRESTv2 } from "@forgerock/crest-js";
 *
 * const resource = new CRESTv2("http://www.example.com");
 */
class v2 {
    /**
     * Creates a new instance.
     * @param {string} resourceURL URL of the resource.
     * @param {Object} [options={}] Options.
     * @param {middleware[]} [options.middleware=[]] Middleware.
     * @param {string} [options.resourceVersion=1.0] Resource version.
     */
    constructor (resourceURL, { middleware = [], resourceVersion = "1.0" } = {}) {
        this.resourceURL = resourceURL;
        this.resourceVersion = resourceVersion;
        this.request = createRequest(this.protocolVersion, resourceVersion, middleware);
    }
    /**
     * CREST protocol version.
     * @readonly
     */
    get protocolVersion () {
        return "2.0";
    }
    /**
     * Invokes an action on a resource provider.
     * @param {string} action Action name.
     * @param {Object} [options={}] Options.
     * @param {Object} [options.body] Action body.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-action
     */
    action (action, { body, queryString } = {}) {
        const input = appendQueryString(this.resourceURL, {
            ...queryString,
            _action: action
        });
        const headers = body ? { "Content-Type": "application/json" } : {};

        return this.request(input, {
            body: body ? createBody(body) : undefined,
            headers,
            method: "POST"
        });
    }
    /**
     * Creates a resource.
     * @param {Object} body Resource representation.
     * @param {Object} [options={}] Options.
     * @param {string} [options.id] Client provided ID for the resource.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-create
     */
    create (body, { id, queryString } = {}) {
        const input = this.constructCreateInput(id, queryString);
        const headers = { "Content-Type": "application/json" };
        if (id) { headers["If-None-Match"] = "*"; }

        return this.request(input, {
            body: createBody(body),
            headers,
            method: id ? "PUT" : "POST"
        });
    }
    /**
     * Constructs the input when creating a resource.
     * @param {string} [id] Client provided ID for the resource.
     * @param {Object} [queryString] Additional query string.
     * @returns {string} The input.
     * @see #create
     * @private
     */
    constructCreateInput (id, queryString) {
        return id
            ? appendQueryString(appendPathComponent(this.resourceURL, id), queryString)
            : appendQueryString(this.resourceURL, { ...queryString, _action: "create" });
    }
    /**
     * Deletes a single resource by ID.
     * @param {string} id Resource ID.
     * @param {Object} [options={}] Options.
     * @param {string} [options.revision] Revision ID.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-delete
     */
    delete (id, { queryString, revision } = {}) {
        const input = appendQueryString(appendPathComponent(this.resourceURL, id), queryString);
        const headers = {};
        if (revision) { headers["If-Match"] = revision; }

        return this.request(input, {
            headers,
            method: "DELETE"
        });
    }
    /**
     * Retrieves a single resource by ID.
     * @param {string} id Resource ID.
     * @param {Object} [options={}] Options.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-read
     */
    get (id, { queryString } = {}) {
        const input = appendQueryString(appendPathComponent(this.resourceURL, id), queryString);
        return this.request(input, {
            method: "GET"
        });
    }
    /**
     * Queries a resource collection.
     * @param {Object} [options={}] Options.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-query
     */
    queryFilter ({ queryString } = {}) {
        const input = appendQueryString(this.resourceURL, {
            ...queryString,
            _queryFilter: true
        });
        return this.request(input, {
            method: "GET"
        });
    }
    /**
     * Updates a single resource by ID.
     * @param {string} id Resource ID.
     * @param {Object} body Resource representation.
     * @param {Object} [options={}] Options.
     * @param {string} [options.revision] Revision ID.
     * @param {Object} [options.queryString] Additional query string.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-update
     */
    update (id, body, { queryString, revision } = {}) {
        const input = appendQueryString(appendPathComponent(this.resourceURL, id), queryString);
        const headers = { "Content-Type": "application/json" };
        if (revision) { headers["If-Match"] = revision; }

        return this.request(input, {
            body: createBody(body),
            headers,
            method: "PUT"
        });
    }
}

export default v2;
