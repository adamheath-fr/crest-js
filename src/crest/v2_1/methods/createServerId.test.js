import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import Index from "../index";

const body = { attribute: "value" };
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

test("invokes \"fetch\" with input", (t) => {
    new Index(url).create(body);
    t.is(fetchSpy.lastCall.args[0], `${url}/`);
});

test("invokes \"fetch\" with additional query strings appended to input", (t) => {
    new Index(url).create(body, {
        queryString: {
            query: "value"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?query=value`);
});

test("invokes \"fetch\" with additional query strings encoded in input", (t) => {
    new Index(url).create(body, {
        queryString: {
            "%/^ä #*!": "%/^ä #*!"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?%25%2F%5E%C3%A4+%23%2A%21=%25%2F%5E%C3%A4+%23%2A%21`);
});
