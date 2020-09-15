import faker from "faker";
import test from "ava";

import CRESTError from "../errors/CRESTError";
import throwOnUnsuccessful from "./throwOnUnsuccessful";

test("is a function", (t) => t.is(typeof throwOnUnsuccessful, "function"));

test("returns a Promise", (t) => {
    const response = new Response(null);
    const promise = Promise.resolve(response);
    t.true(throwOnUnsuccessful(promise) instanceof Promise);
});

test("resolves with Response", (t) => {
    const response = new Response(null);
    const promise = Promise.resolve(response);
    return throwOnUnsuccessful(promise).then((nextResponse) => t.is(nextResponse, response));
});

test("rejects with same reason", (t) => {
    const reason = new Error();
    const promise = Promise.reject(reason);
    return throwOnUnsuccessful(promise).catch((error) => {
        return t.is(error, reason);
    });
});

test("throws \"CRESTError\" when \"response.ok\" is \"false\"", async (t) => {
    const response = new Response(null, { status: 500 });
    const promise = Promise.resolve(response);
    await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
});

test("throws \"CRESTError\" with \"url\" from \"response\"", async (t) => {
    const url = faker.internet.url();
    const response = new Response(null, { status: 500, url });
    const promise = Promise.resolve(response);
    const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
    t.is(error.url, url);
});

test("throws \"CRESTError\" with \"status\" from \"response\"", async (t) => {
    const response = new Response(null, { status: 500 });
    const promise = Promise.resolve(response);
    const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
    t.is(error.status, 500);
});

test("throws \"CRESTError\" with \"statusMessage\" from \"json.reason\"", async (t) => {
    const reason = faker.lorem.sentence();
    const response = new Response(JSON.stringify({ reason }), { status: 500 });
    const promise = Promise.resolve(response);
    const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
    t.is(error.statusMessage, reason);
});

test("throws \"CRESTError\" with \"statusMessage\" from \"response.statusText\" when \"json.reason\" is not present",
    async (t) => {
        const statusText = faker.lorem.sentence();
        const response = new Response(null, { status: 500, statusText });
        const promise = Promise.resolve(response);
        const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
        t.is(error.statusMessage, statusText);
    });

test("throws \"CRESTError\" with \"message\" from \"json.message\"", async (t) => {
    const message = faker.lorem.sentence();
    const response = new Response(JSON.stringify({ message }), { status: 500 });
    const promise = Promise.resolve(response);
    const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
    t.is(error.message, message);
});

test("throws \"CRESTError\" with \"message\" of undefined when \"json.message\" is not present",
    async (t) => {
        const response = new Response(null, { status: 500 });
        const promise = Promise.resolve(response);
        const error = await t.throwsAsync(throwOnUnsuccessful(promise), { instanceOf: CRESTError });
        t.is(error.message, undefined);
    });
