import faker from "faker";
import test from "ava";

import CRESTError from "../errors/CRESTError";
import throwFailedResponse from "./throwFailedResponse";

test("is a function", (t) => t.is(typeof throwFailedResponse, "function"));

test("returns a Promise", (t) => {
    const response = new Response(null);
    t.true(throwFailedResponse(response) instanceof Promise);
});

test("resolves with JSON", (t) => {
    const response = new Response(null);
    const parsedJSON = { body: true };
    return throwFailedResponse(response, parsedJSON).then((json) => {
        return t.deepEqual(json, parsedJSON);
    });
});

test("throws \"CRESTError\" when \"response.ok\" is \"false\"", async (t) => {
    const response = new Response(null, { status: 500 });
    await t.throws(throwFailedResponse(response, { reason: true }), CRESTError);
});

test("throws \"CRESTError\" with \"url\" from \"response\"", async (t) => {
    const url = faker.internet.url();
    const response = new Response(null, { status: 500, url });
    const error = await t.throws(throwFailedResponse(response, { reason: true }), CRESTError);
    t.is(error.url, url);
});

test("throws \"CRESTError\" with \"status\" from \"response\"", async (t) => {
    const response = new Response(null, { status: 500 });
    const error = await t.throws(throwFailedResponse(response, { reason: true }), CRESTError);
    t.is(error.status, 500);
});

test("throws \"CRESTError\" with \"statusMessage\" from \"json.reason\"", async (t) => {
    const reason = faker.lorem.sentence();
    const response = new Response(null, { status: 500 });
    const error = await t.throws(throwFailedResponse(response, { reason }), CRESTError);
    t.is(error.statusMessage, reason);
});

test("throws \"CRESTError\" with \"statusMessage\" from \"response.statusText\" when \"json.reason\" is not present",
    async (t) => {
        const statusText = faker.lorem.sentence();
        const response = new Response(null, { status: 500, statusText });
        const error = await t.throws(throwFailedResponse(response), CRESTError);
        t.is(error.statusMessage, statusText);
    });

test("throws \"CRESTError\" with \"message\" from \"json.message\"", async (t) => {
    const message = faker.lorem.sentence();
    const response = new Response(null, { status: 500 });
    const error = await t.throws(throwFailedResponse(response, { message }), CRESTError);
    t.is(error.message, message);
});

test("throws \"CRESTError\" with \"message\" of undefined when \"json.message\" is not present",
    async (t) => {
        const response = new Response(null, { status: 500 });
        const error = await t.throws(throwFailedResponse(response), CRESTError);
        t.is(error.message, undefined);
    });
