import faker from "faker";
import sinon from "sinon";
import test from "ava";

import * as createRequest from "../createRequest";
import Index from "./index";

const url = faker.internet.url();
const createRequestSpy = sinon.spy(createRequest, "default");

test.afterEach(() => createRequestSpy.resetHistory());
test.after(() => createRequestSpy.restore());

test("is a Class", (t) => t.is(typeof Index, "function"));

test("constructor argument \"resourceVersion\" defaults to \"1.0\"", (t) => {
    t.is(new Index(url).resourceVersion, "1.0");
});

test("constructor argument \"resourceVersion\" overrides default", (t) => {
    const resourceVersion = "10.0";
    t.is(new Index(url, resourceVersion).resourceVersion, resourceVersion);
});

test("constructor invokes \"createRequest\" with a protocol value of \"2.0\"", (t) => {
    const v2 = new Index(url);
    t.true(createRequestSpy.calledWith("2.0"));
});

test("an instance has \"action\" method", (t) => t.is(typeof new Index(url).action, "function"));

test("an instance has \"create\" method", (t) => t.is(typeof new Index(url).create, "function"));

test("an instance has \"delete\" method", (t) => t.is(typeof new Index(url).delete, "function"));

test("an instance has \"get\" method", (t) => t.is(typeof new Index(url).get, "function"));

test("an instance has \"queryFilter\" method", (t) => t.is(typeof new Index(url).queryFilter, "function"));

test("an instance has \"update\" method", (t) => t.is(typeof new Index(url).update, "function"));
