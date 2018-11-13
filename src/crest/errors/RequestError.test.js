import faker from "faker";
import test from "ava";

import RequestError from "./RequestError";

test("is a Class", (t) => t.is(typeof RequestError, "function"));

test("inherits from Error", (t) => t.true(new RequestError() instanceof Error));

test("an instance has \"message\" attribute", (t) => {
    const message = faker.lorem.sentence();
    t.is(new RequestError(message).message, message);
});
