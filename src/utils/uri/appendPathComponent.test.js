import faker from "faker";
import test from "ava";

import appendPathComponent from "./appendPathComponent";

const url = faker.internet.url();
const pathComponent = faker.internet.domainWord();

test("is a function", (t) => t.is(typeof appendPathComponent, "function"));

test("returns a string", (t) => t.is(typeof appendPathComponent(url, pathComponent), "string"));

test("appends a path component", (t) => t.is(appendPathComponent(url, pathComponent), `${url}/${pathComponent}`));

test("encodes the path component", (t) =>
    t.is(appendPathComponent(url, "%/^ä #*!"), `${url}/%25%2F%5E%C3%A4%20%23%2A%21`));

test("prepends the path component before the fragment", (t) =>
    t.is(appendPathComponent(`${url}#fragment`, pathComponent), `${url}/${pathComponent}#fragment`));

test("prepends the path component before the query", (t) =>
    t.is(appendPathComponent(`${url}?query`, pathComponent), `${url}/${pathComponent}?query`));
