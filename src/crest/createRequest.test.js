import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import * as invokeFetch from "./fetch/invokeFetch";
import * as parseResponse from "./middleware/parseResponse";
import * as throwFailedResponse from "./middleware/throwFailedResponse";
import createRequest from "./createRequest";

const invokeFetchSpy = sinon.spy(invokeFetch, "default");
const options = { option: true };
const parseResponseSpy = sinon.spy(parseResponse, "default");
const protocolVersion = "2.0";
const throwFailedResponseSpy = sinon.spy(throwFailedResponse, "default");
const url = faker.internet.url();
const resourceVersion = "1.0";

test.before(() => fetchMock.mock(url, { response: true }));
test.afterEach(() => {
    fetchMock.resetHistory();
    invokeFetchSpy.resetHistory();
    parseResponseSpy.resetHistory();
});
test.after(() => {
    fetchMock.restore();
    invokeFetchSpy.restore();
    parseResponseSpy.restore();
});

test("is a function", (t) => t.is(typeof createRequest, "function"));

test("returns a function", (t) => t.is(typeof createRequest(url), "function"));

test("returned function invokes \"invokeFetch\" with input", (t) => {
    createRequest(protocolVersion, resourceVersion)(url);
    t.true(invokeFetchSpy.calledWith(url));
});

test("returned function invokes \"invokeFetch\" with argument options", (t) => {
    const options = { method: "GET" };
    createRequest(protocolVersion, resourceVersion)(url, options);
    t.true(invokeFetchSpy.calledWithMatch(url, options));
});

test("returned function invokes \"invokeFetch\" with the header \"Accept-API-Version\" set to the correct " +
    "\"protocolVersion\" and \"resource\"", (t) => {
    createRequest(protocolVersion, resourceVersion)(url, options);
    t.is(invokeFetchSpy.getCall(0).args[1].headers["Accept-API-Version"],
        `protocol=${protocolVersion},resource=${resourceVersion}`);
});

test("returned function invokes \"invokeFetch\" with the header \"Accept-API-Version\" that cannot be " +
    "overridden", (t) => {
    createRequest(protocolVersion, resourceVersion)(url, { headers: { "Accept-API-Version": true } });
    t.is(invokeFetchSpy.getCall(0).args[1].headers["Accept-API-Version"],
        `protocol=${protocolVersion},resource=${resourceVersion}`);
});

test("returned function invokes \"parseResponse\" with the return value of \"invokeFetch\"", (t) => {
    createRequest(protocolVersion, resourceVersion)(url);
    t.true(parseResponseSpy.calledWith(invokeFetchSpy.getCall(0).returnValue));
});

test("returned function invokes \"throwFailedResponse\" with the return values of \"invokeFetch\" and " +
    "\"parseResponse\"", (t) => {
    createRequest(protocolVersion, resourceVersion)(url);
    t.true(throwFailedResponseSpy.calledWith(
        invokeFetchSpy.getCall(0).returnValue,
        parseResponseSpy.getCall(0).returnValue
    ));
});
