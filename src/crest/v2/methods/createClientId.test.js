import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import Index from "../index";

const body = { attribute: "value" };
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

test("invokes \"fetch\" with id appended to input", (t) => {
    new Index(url).create(body, id);
    t.true(fetchSpy.calledWith(`${url}/${id}`));
});

test("invokes \"fetch\" with the \"method\" set to \"PUT\"", (t) => {
    new Index(url).create(body, id);
    t.true(fetchSpy.calledWithMatch(url, {
        method: "PUT"
    }));
});

test("invokes \"fetch\" with the header \"If-None-Match\" set to \"*\"", (t) => {
    new Index(url).create(body, id);
    t.is(fetchSpy.lastCall.args[1].headers.get("If-None-Match"), "*");
});
