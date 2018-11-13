import faker from "faker";
import test from "ava";

import ParseError from "./ParseError";

test("is a Class", (t) => t.is(typeof ParseError, "function"));

test("inherits from Error", (t) => t.true(new ParseError() instanceof Error));

test("an instance has \"message\" attribute", (t) => {
    const message = faker.lorem.sentence();
    t.is(new ParseError(message).message, message);
});
