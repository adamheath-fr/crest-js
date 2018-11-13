import test from "ava";

import createHeaders from "./createHeaders";

test("is a function", (t) => t.is(typeof createHeaders, "function"));

test("returns a Headers instance", (t) => t.true(createHeaders() instanceof Headers));

test("sets the header \"Accept\" to \"application/json\"", (t) =>
    t.is(createHeaders().get("Accept"), "application/json"));

test("sets the header \"X-Requested-With\" to \"ForgeRock CREST.js\"", (t) =>
    t.is(createHeaders().get("X-Requested-With"), "ForgeRock CREST.js"));

test("merges argument headers with default headers", (t) => {
    const headers = createHeaders({ Header: "value" });
    t.true(headers.has("Accept"));
    t.true(headers.has("header"));
    t.true(headers.has("X-Requested-With"));
});
