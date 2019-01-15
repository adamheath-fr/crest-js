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

test("is a function", (t) => t.is(typeof new Index(url).action, "function"));

test("returns a Promise", (t) => t.true(new Index(url).action() instanceof Promise));

test("invokes \"fetch\" with the \"method\" set to \"POST\"", (t) => {
    new Index(url).action();
    t.true(fetchSpy.calledWithMatch(url, {
        method: "POST"
    }));
});

test("invokes \"fetch\" with \"_action\" query string appended to input", (t) => {
    new Index(url).action("action");
    t.is(fetchSpy.lastCall.args[0], `${url}/?_action=action`);
});

test("invokes \"fetch\" with \"_action\" query string from parameter and not additional query strings", (t) => {
    new Index(url).action("action1", {
        queryString: {
            _action: "action2"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?_action=action1`);
});

test("invokes \"fetch\" with additional query strings appended to input", (t) => {
    new Index(url).action("action", {
        queryString: {
            query: "value"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?query=value&_action=action`);
});

test("invokes \"fetch\" with additional query strings encoded in input", (t) => {
    new Index(url).action("action", {
        queryString: {
            "%/^ä #*!": "%/^ä #*!"
        }
    });
    t.is(fetchSpy.lastCall.args[0], `${url}/?%25%2F%5E%C3%A4+%23%2A%21=%25%2F%5E%C3%A4+%23%2A%21&_action=action`);
});

test("invokes \"fetch\" with the header \"Content-Type\" not set", (t) => {
    new Index(url).action("action");
    t.false(fetchSpy.lastCall.args[1].headers.has("Content-Type"));
});

test("invokes \"fetch\" with the \"body\" set to undefined", (t) => {
    new Index(url).action("action");
    t.true(fetchSpy.calledWithMatch(url, { body: undefined }));
});
