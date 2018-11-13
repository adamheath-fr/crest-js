import test from "ava";

import * as index from "./index";

test("exports exactly", (t) => t.deepEqual(index, {
    CRESTError: index.CRESTError,
    CRESTv2: index.CRESTv2,
    ParseError: index.ParseError,
    RequestError: index.RequestError
}));

test("exports \"CRESTError\"", (t) => t.truthy(index.CRESTError));

test("exports \"CRESTv2\"", (t) => t.truthy(index.CRESTv2));

test("exports \"ParseError\"", (t) => t.truthy(index.ParseError));

test("exports \"RequestError\"", (t) => t.truthy(index.RequestError));
