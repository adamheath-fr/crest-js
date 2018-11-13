/**
 * Entry point for ForgeRock CREST.js.
 * @module forgerock-crest-js
 * @example <caption>Import named exports.</caption>
 * import { CRESTError, CRESTv2, ParseError, RequestError } from "forgerock-crest-js";
 * @example <caption>Import module.</caption>
 * import * as crest from "forgerock-crest-js";
 */

export {
    /**
     * @see CRESTError
     */
    default as CRESTError
} from "./crest/errors/CRESTError";

export {
    /**
     * @see v2
     */
    default as CRESTv2
} from "./crest/v2";

export {
    /**
     * @see v2_1
     */
    default as CRESTv2_1
} from "./crest/v2_1";

export {
    /**
     * @see ParseError
     */
    default as ParseError
} from "./crest/errors/ParseError";

export {
    /**
     * @see RequestError
     */
    default as RequestError
} from "./crest/errors/RequestError";
