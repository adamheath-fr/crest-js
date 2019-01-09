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

test("is a function", (t) => t.is(typeof new Index(url).update, "function"));

test("returns a Promise", (t) => t.true(new Index(url).update() instanceof Promise));

test("invokes \"fetch\" with id appended to input", (t) => {
    new Index(url).update(id);
    t.true(fetchSpy.calledWith(`${url}/${id}`));
});

test("invokes \"fetch\" with the \"method\" set to \"PUT\"", (t) => {
    new Index(url).update();
    t.true(fetchSpy.calledWithMatch(url, {
        method: "PUT"
    }));
});

test("invokes \"fetch\" with the header \"Content-Type\" set to \"application/json\"", (t) => {
    new Index(url).update();
    t.is(fetchSpy.lastCall.args[1].headers.get("Content-Type"), "application/json");
});

test("invokes \"fetch\" with the \"body\" set to a stringified Object", (t) => {
    const body = { attribute: "value" };
    new Index(url).update(id, body);
    t.true(fetchSpy.calledWithMatch(url, { body: JSON.stringify(body) }));
});
