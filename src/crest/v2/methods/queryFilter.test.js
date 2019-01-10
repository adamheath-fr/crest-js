import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import Index from "../index";

const fetchSpy = sinon.spy(fetchMock, "fetchHandler");
const url = faker.internet.url();

test.before(() => fetchMock.mock("*", { response: true }));
test.afterEach(() => {
    fetchMock.resetHistory();
    fetchSpy.resetHistory();
});
test.after(() => {
    fetchMock.restore();
    fetchSpy.restore();
});

test("is a function", (t) => t.is(typeof new Index(url).queryFilter, "function"));

test("returns a Promise", (t) => t.true(new Index(url).queryFilter() instanceof Promise));

test("invokes \"fetch\" with the \"method\" set to \"GET\"", (t) => {
    new Index(url).queryFilter();
    t.true(fetchSpy.calledWithMatch(url, {
        method: "GET"
    }));
});

test("invokes \"fetch\" with \"_queryFilter\" query string appended to input", (t) => {
    new Index(url).queryFilter();
    t.is(fetchSpy.lastCall.args[0], `${url}/?_queryFilter=true`);
});

test("invokes \"fetch\" with \"_queryFilter\" query string from parameter and not additional query strings", (t) => {
    new Index(url).queryFilter({
        queryString: {
            _queryFilter: false
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?_queryFilter=true`);
});

test("invokes \"fetch\" with additional query strings appended to input", (t) => {
    new Index(url).queryFilter({
        queryString: {
            query: "value"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?query=value&_queryFilter=true`);
});

test("invokes \"fetch\" with additional query strings encoded in input", (t) => {
    new Index(url).queryFilter({
        queryString: {
            "%/^ä #*!": "%/^ä #*!"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?%25%2F%5E%C3%A4+%23%2A%21=%25%2F%5E%C3%A4+%23%2A%21&_queryFilter=true`);
});
