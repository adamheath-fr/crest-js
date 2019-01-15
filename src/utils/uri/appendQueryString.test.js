import faker from "faker";
import test from "ava";

import appendQueryString from "./appendQueryString";

const url = faker.internet.url();
const queryStringKey = faker.lorem.word();
const queryStringValue = faker.lorem.word();
const queryString = {
    [queryStringKey]: queryStringValue
};

test("is a function", (t) => t.is(typeof appendQueryString, "function"));

test("returns a string", (t) => t.is(typeof appendQueryString(url, queryString), "string"));

test("appends a query string", (t) =>
    t.is(appendQueryString(url, queryString), `${url}/?${queryStringKey}=${queryStringValue}`));

test("encodes the query string", (t) => {
    const queryString = {
        "%/^ä #*!": "%/^ä #*!"
    };
    t.is(appendQueryString(url, queryString), `${url}/?%25%2F%5E%C3%A4+%23%2A%21=%25%2F%5E%C3%A4+%23%2A%21`);
});
