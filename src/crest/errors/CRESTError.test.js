import faker from "faker";
import test from "ava";

import CRESTError from "./CRESTError";

test("is a Class", (t) => t.is(typeof CRESTError, "function"));

test("inherits from Error", (t) => t.true(new CRESTError() instanceof Error));

test("an instance has \"message\" attribute", (t) => {
    const message = faker.lorem.sentence();
    t.is(new CRESTError(null, null, null, message).message, message);
});

test("an instance has \"statusMessage\" attribute", (t) => {
    const statusMessage = faker.lorem.word();
    t.is(new CRESTError(null, null, statusMessage).statusMessage, statusMessage);
});

test("an instance has \"status\" attribute", (t) => {
    const status = 200;
    t.is(new CRESTError(null, status).status, status);
});

test("an instance has \"url\" attribute", (t) => {
    const url = faker.internet.url();
    t.is(new CRESTError(url).url, url);
});
