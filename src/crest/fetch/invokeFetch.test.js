import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import * as createHeaders from "./createHeaders";
import invokeFetch from "./invokeFetch";
import RequestError from "../errors/RequestError";

const createHeadersSpy = sinon.spy(createHeaders, "default");
const fetchSpy = sinon.spy(fetchMock, "fetchHandler");
const url = faker.internet.url();

test.before(() => fetchMock.mock(url, { response: true }));
test.afterEach(() => {
    createHeadersSpy.resetHistory();
    fetchMock.resetHistory();
    fetchSpy.resetHistory();
});
test.after(() => {
    createHeadersSpy.restore();
    fetchMock.restore();
    fetchSpy.restore();
});

test("is a function", (t) => t.is(typeof invokeFetch, "function"));

test("returns a Promise", (t) => t.true(invokeFetch(url) instanceof Promise));

test("invokes \"fetch\" with input", (t) => {
    invokeFetch(url);
    t.true(fetchSpy.calledWith(url));
});

test("invokes \"fetch\" with the option \"credentials\" set to \"same-origin\"", (t) => {
    invokeFetch(url);
    t.true(fetchSpy.calledWithMatch(url, { credentials: "same-origin" }));
});

test("invokes \"fetch\" with argument options merged with default options", (t) => {
    invokeFetch(url, { method: "GET" });
    t.true(fetchSpy.calledWithMatch(url, {
        credentials: "same-origin",
        method: "GET"
    }));
});

test("invokes \"fetch\" with argument options overriding default options", (t) => {
    const options = { credentials: true };
    invokeFetch(url, options);
    t.true(fetchSpy.calledWithMatch(url, options));
});

test("invokes \"createHeaders\" with argument options.headers", (t) => {
    const options = { headers: true };
    invokeFetch(url, options);
    t.true(createHeadersSpy.calledWith(options.headers));
});

test("throws \"RequestError\" when \"fetch\" throws", async (t) => {
    const failureUrl = faker.internet.url();
    fetchMock.mock(failureUrl, { "throws": true });
    await t.throwsAsync(invokeFetch(failureUrl), { instanceOf: RequestError });
});

test("throws \"RequestError\" with message which \"fetch\" throws", async (t) => {
    const failureUrl = faker.internet.url();
    const message = faker.lorem.sentence();
    fetchMock.mock(failureUrl, { "throws": message });
    const error = await t.throwsAsync(invokeFetch(failureUrl), { instanceOf: RequestError });
    t.is(error.message, message);
});
