import appendQueryString from "../../utils/uri/appendQueryString";
import v2 from "../v2/index";

/**
 * Representation of a CREST v2.1 resource.
 * @extends v2
 * @example
 * import { CRESTv2_1 } from "@forgerock/crest-js";
 *
 * const resource = new CRESTv2_1("http://www.example.com");
 */
class v2_1 extends v2 {
    /**
     * @override
     */
    get protocolVersion () {
        return "2.1";
    }
    /**
     * @override
     */
    constructCreateInput (id, queryString) {
        return id ? super.constructCreateInput(id, queryString) : appendQueryString(this.resourceURL, queryString);
    }
}

export default v2_1;
