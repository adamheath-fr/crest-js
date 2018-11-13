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

test("is a function", (t) => t.is(typeof new Index(url).delete, "function"));

test("returns a Promise", (t) => t.true(new Index(url).delete() instanceof Promise));

test("invokes \"fetch\" with the \"method\" set to \"DELETE\"", (t) => {
    new Index(url).delete();
    t.true(fetchSpy.calledWithMatch(url, {
        method: "DELETE"
    }));
});

test("invokes \"fetch\" with id appended to input", (t) => {
    new Index(url).delete(id);
    t.true(fetchSpy.calledWith(`${url}/${id}`));
});
