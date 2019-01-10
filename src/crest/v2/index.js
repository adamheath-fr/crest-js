import appendPathComponent from "../../utils/uri/appendPathComponent";
import createBody from "./createBody";
import createRequest from "../createRequest";

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
     * @param {string} [resourceVersion=1.0] Resource version.
     */
    constructor (resourceURL, resourceVersion = "1.0") {
        this.resourceURL = resourceURL;
        this.resourceVersion = resourceVersion;
        this.request = createRequest(this.protocolVersion, resourceVersion);
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
     * @param {Object} [body] Action body.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-action
     */
    action (action, body) {
        const headers = body ? { "Content-Type": "application/json" } : {};

        return this.request(`${this.resourceURL}?_action=${action}`, {
            body: body ? createBody(body) : undefined,
            headers,
            method: "POST"
        });
    }
    /**
     * Creates a resource.
     * @param {Object} body Resource representation.
     * @param {string} [id] Client provided ID for the resource.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-create
     */
    create (body, id) {
        const input = this.createConstructInput(id);
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
     * @returns {string} The input.
     * @see #create
     * @private
     */
    createConstructInput (id) {
        return id ? appendPathComponent(this.resourceURL, id) : `${this.resourceURL}?_action=create`;
    }
    /**
     * Deletes a single resource by ID.
     * @param {string} id Resource ID.
     * @param {string} [revision] Revision ID.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-delete
     */
    delete (id, revision) {
        const headers = {};
        if (revision) { headers["If-Match"] = revision; }

        return this.request(appendPathComponent(this.resourceURL, id), {
            headers,
            method: "DELETE"
        });
    }
    /**
     * Retrieves a single resource by ID.
     * @param {string} id Resource ID.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-read
     */
    get (id) {
        return this.request(appendPathComponent(this.resourceURL, id));
    }
    /**
     * Queries a resource collection.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-query
     */
    queryFilter () {
        return this.request(`${this.resourceURL}?_queryFilter=true`);
    }
    /**
     * Updates a single resource by ID.
     * @param {string} id Resource ID.
     * @param {Object} body Resource representation.
     * @param {string} [revision] Revision ID.
     * @returns {Promise<Response>} A Promise that resolves to a Response object.
     * @see https://backstage.forgerock.com/docs/am/6.5/dev-guide/#about-crest-update
     */
    update (id, body, revision) {
        const headers = { "Content-Type": "application/json" };
        if (revision) { headers["If-Match"] = revision; }

        return this.request(appendPathComponent(this.resourceURL, id), {
            body: createBody(body),
            headers,
            method: "PUT"
        });
    }
}

export default v2;
