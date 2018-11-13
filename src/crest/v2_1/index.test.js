import faker from "faker";
import sinon from "sinon";
import test from "ava";

import * as createRequest from "../createRequest";
import Index from "./index";
import v2 from "../v2/index";

const url = faker.internet.url();
const createRequestSpy = sinon.spy(createRequest, "default");

test.afterEach(() => createRequestSpy.resetHistory());
test.after(() => createRequestSpy.restore());

test("is a Class", (t) => t.is(typeof Index, "function"));

test("extends v2", (t) => t.true(Index.prototype instanceof v2));

test("constructor invokes \"createRequest\" with a protocol value of \"2.1\"", (t) => {
    new Index(url);
    t.true(createRequestSpy.calledWith("2.1"));
});
