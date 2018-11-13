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

test("invokes \"fetch\" with \"_action=create\" query parameter appended to input", (t) => {
    new Index(url).create(body);
    t.true(fetchSpy.calledWith(`${url}?_action=create`));
});

test("invokes \"fetch\" with the \"method\" set to \"POST\"", (t) => {
    new Index(url).create();
    t.true(fetchSpy.calledWithMatch(url, {
        method: "POST"
    }));
});
