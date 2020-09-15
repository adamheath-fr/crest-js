import faker from "faker";
import test from "ava";

import ParseError from "../errors/ParseError";
import parse from "./parse";

const body = JSON.stringify({ response: true });

test("is a function", (t) => t.is(typeof parse, "function"));

test("returns a Promise", (t) => {
    const response = new Response(body);
    const promise = Promise.resolve(response);
    t.true(parse(promise) instanceof Promise);
});

test("resolves with JSON", (t) => {
    const response = new Response(body);
    const promise = Promise.resolve(response);
    return parse(promise).then((json) => {
        return t.deepEqual(json, JSON.parse(body));
    });
});

test("rejects with same reason", (t) => {
    const reason = new Error();
    const promise = Promise.reject(reason);
    return parse(promise).catch((error) => {
        return t.is(error, reason);
    });
});

test("throws \"ParseError\" when \"response.json\" throws", async (t) => {
    const response = new Response();
    const promise = Promise.resolve(response);
    await t.throwsAsync(parse(promise), { instanceOf: ParseError });
});

test("throws \"ParseError\" with message which \"response.json\" throws", async (t) => {
    const message = faker.lorem.sentence();
    const promise = Promise.resolve({
        json: () => Promise.reject(message)
    });
    const error = await t.throwsAsync(parse(promise), { instanceOf: ParseError });
    t.is(error.message, message);
});
