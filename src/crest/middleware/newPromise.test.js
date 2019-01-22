import test from "ava";

import newPromise from "./newPromise";

const thenable = {
    then: () => {}
};

test("is a function", (t) => t.is(typeof newPromise, "function"));

test("returns a Promise", (t) => {
    const promise = Promise.resolve();
    t.true(newPromise(promise) instanceof Promise);
});

test("returns original Promise when passed a Promise", (t) => {
    const promise = Promise.resolve();
    t.is(newPromise(promise), promise);
});

test("does not return original Promise when passed a thenable", (t) => {
    t.not(newPromise(thenable), thenable);
});

test("returns a new Promise when passed a thenable", (t) => {
    t.true(newPromise(thenable) instanceof Promise);
});
