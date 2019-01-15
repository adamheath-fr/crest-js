import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import * as invokeFetch from "./fetch/invokeFetch";
import * as parse from "./middleware/parse";
import * as throwOnUnsuccessful from "./middleware/throwOnUnsuccessful";
import createRequest from "./createRequest";

const invokeFetchSpy = sinon.spy(invokeFetch, "default");
const options = { option: true };
const parseSpy = sinon.spy(parse, "default");
const protocolVersion = "2.0";
const resourceVersion = "1.0";
const throwOnUnsuccessfulSpy = sinon.spy(throwOnUnsuccessful, "default");
const url = faker.internet.url();

test.before(() => fetchMock.mock(url, { response: true }));
test.afterEach(() => {
    fetchMock.resetHistory();
    invokeFetchSpy.resetHistory();
    parseSpy.resetHistory();
});
test.after(() => {
    fetchMock.restore();
    invokeFetchSpy.restore();
    parseSpy.restore();
});

test("is a function", (t) => t.is(typeof createRequest, "function"));

test("returns a function", (t) => t.is(typeof createRequest(), "function"));

test("returned function returns a Promise", (t) =>
    t.true(createRequest(protocolVersion, resourceVersion, [])(url) instanceof Promise));

test("returned function invokes \"invokeFetch\" with input", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url);
    t.true(invokeFetchSpy.calledWith(url));
});

test("returned function invokes \"invokeFetch\" with argument options", (t) => {
    const options = { method: "GET" };
    createRequest(protocolVersion, resourceVersion, [])(url, options);
    t.true(invokeFetchSpy.calledWithMatch(url, options));
});

test("returned function invokes \"invokeFetch\" with the header \"Accept-API-Version\" set to the correct " +
    "\"protocolVersion\" and \"resource\"", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url, options);
    t.is(invokeFetchSpy.lastCall.args[1].headers["Accept-API-Version"],
        `protocol=${protocolVersion},resource=${resourceVersion}`);
});

test("returned function invokes \"invokeFetch\" with the header \"Accept-API-Version\" that cannot be " +
    "overridden", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url, { headers: { "Accept-API-Version": true } });
    t.is(invokeFetchSpy.lastCall.args[1].headers["Accept-API-Version"],
        `protocol=${protocolVersion},resource=${resourceVersion}`);
});

// Middleware
test("returned function invokes static middleware in the expected order", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url);
    t.true(throwOnUnsuccessfulSpy.calledImmediatelyBefore(parseSpy));
});

test("returned function invokes \"middleware\" after static middleware", (t) => {
    const middleware = sinon.stub();
    createRequest(protocolVersion, resourceVersion, [middleware])(url);
    t.true(middleware.calledImmediatelyAfter(parseSpy));
});

test("returned function invokes \"middleware\" in the expected order", (t) => {
    const middlewareOne = sinon.stub();
    const middlewareTwo = sinon.stub();
    createRequest(protocolVersion, resourceVersion, [middlewareOne, middlewareTwo])(url);
    t.true(middlewareTwo.calledImmediatelyAfter(middlewareOne));
});

test("returned function invokes \"middleware\" with the return value of \"invokeFetch\"", (t) => {
    const middleware = sinon.stub();
    createRequest(protocolVersion, resourceVersion, [middleware])(url);
    t.true(middleware.calledWith(invokeFetchSpy.lastCall.returnValue));
});

test("returned function invokes middleware \"throwOnUnsuccessful\" with the return value of \"invokeFetch\"", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url);
    t.true(throwOnUnsuccessfulSpy.calledWith(invokeFetchSpy.lastCall.returnValue));
});

test("returned function invokes middleware \"parse\" with the return value of \"invokeFetch\"", (t) => {
    createRequest(protocolVersion, resourceVersion, [])(url);
    t.true(parseSpy.calledWith(invokeFetchSpy.lastCall.returnValue));
});
