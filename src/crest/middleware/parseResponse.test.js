import faker from "faker";
import test from "ava";

import ParseError from "../errors/ParseError";
import parseResponse from "./parseResponse";

const body = JSON.stringify({ response: true });

test("is a function", (t) => t.is(typeof parseResponse, "function"));

test("returns a Promise", (t) => {
    const response = Promise.resolve(new Response(body));
    t.true(parseResponse(response) instanceof Promise);
});

test("resolves with JSON", (t) => {
    const response = Promise.resolve(new Response(body));
    return parseResponse(response).then((json) => {
        return t.deepEqual(json, JSON.parse(body));
    });
});

test("throws \"ParseError\" when \"response.json\" throws", async (t) => {
    const response = Promise.resolve(new Response());
    await t.throws(parseResponse(response), ParseError);
});

test("throws \"ParseError\" with message which \"response.json\" throws", async (t) => {
    const message = faker.lorem.sentence();
    const response = Promise.resolve({
        json: () => Promise.reject(message)
    });
    const error = await t.throws(parseResponse(response), ParseError);
    t.is(error.message, message);
});
