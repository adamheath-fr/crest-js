import faker from "faker";
import fetchMock from "fetch-mock";
import sinon from "sinon";
import test from "ava";

import Index from "../index";

const fetchSpy = sinon.spy(fetchMock, "fetchHandler");
const id = faker.lorem.word();
const url = faker.internet.url();
const revision = faker.random.uuid();

test.before(() => fetchMock.mock("*", { response: true }));
test.afterEach(() => {
    fetchMock.resetHistory();
    fetchSpy.resetHistory();
});
test.after(() => {
    fetchMock.restore();
    fetchSpy.restore();
});

test("invokes \"fetch\" with the header \"If-Match\" set to revision", (t) => {
    new Index(url).delete(id, revision);
    t.is(fetchSpy.getCall(0).args[1].headers.get("If-Match"), revision);
});
