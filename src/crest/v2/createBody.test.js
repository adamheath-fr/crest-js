import test from "ava";

import createBody from "./createBody";

test("is a function", (t) => t.is(typeof createBody, "function"));

test("returns a string", (t) => t.is(typeof createBody(), "string"));

test("returns a stringified Object", (t) => {
    const body = { attribute: "value" };
    t.is(createBody(body), JSON.stringify(body));
});

test("omits \"_rev\" attribute", (t) => {
    t.is(createBody({
        _rev: "value",
        attribute: "value"
    }), JSON.stringify({
        attribute: "value"
    }));
});

test("omits \"_type\" attribute", (t) => {
    t.is(createBody({
        _type: "value",
        attribute: "value"
    }), JSON.stringify({
        attribute: "value"
    }));
});

test("does not modify the argument", (t) => {
    const body = {
        _rev: "value",
        attribute: "value"
    };
    createBody(body);
    t.deepEqual(body, {
        _rev: "value",
        attribute: "value"
    });
});
