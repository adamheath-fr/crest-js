import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import Index from "../index";

const fetchSpy = sinon.spy(fetchMock, "fetchHandler");
const id = faker.lorem.word();
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

test("is a function", (t) => t.is(typeof new Index(url).get, "function"));

test("returns a Promise", (t) => t.true(new Index(url).get() instanceof Promise));

test("invokes \"fetch\" with the \"method\" set to \"GET\"", (t) => {
    new Index(url).get(id);
    t.true(fetchSpy.calledWithMatch(url, {
        method: "GET"
    }));
});

test("invokes \"fetch\" with id appended to input", (t) => {
    new Index(url).get(id);
    t.true(fetchSpy.calledWith(`${url}/${id}`));
});

test("invokes \"fetch\" with additional query strings appended to input", (t) => {
    new Index(url).get(id, {
        queryString: {
            query: "value"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/${id}?query=value`);
});

test("invokes \"fetch\" with additional query strings encoded in input", (t) => {
    new Index(url).get(id, {
        queryString: {
            "%/^ä #*!": "%/^ä #*!"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/${id}?%25%2F%5E%C3%A4+%23%2A%21=%25%2F%5E%C3%A4+%23%2A%21`);
});
