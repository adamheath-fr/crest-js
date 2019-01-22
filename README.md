<div align="center">
  <img width="120" src="logo.png">
  <h1>ForgeRock CREST.js</h1>
  Lightweight Library for Communicating With ForgeRock CREST APIs.
  <p>
  <div>
    <a href="https://www.npmjs.com/package/@forgerock/crest-js">
      <img src="https://img.shields.io/npm/v/@forgerock/crest-js.svg?style=flat-square">
    </a>
    <img src="https://img.shields.io/david/forgerock/crest-js.svg?style=flat-square">
  </div>
</div>

- [Prerequisites](#prerequisites)
- [Supported Versions](#supported-versions)
- [Installation](#installation)
  - [via Yarn](#via-yarn)
  - [via NPM](#via-npm)
- [Usage](#usage)
  - [Basic](#basic)
  - [Supported Methods](#supported-methods)
  - [Options](#options)
    - [`queryString`](#querystring)
  - [Middleware](#middleware)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Building](#building)
  - [Docs](#docs)
  - [Testing](#testing)
  - [Test Coverage](#test-coverage)
- [Contributing](#contributing)
- [Further Reading](#further-reading)

## Prerequisites

ForgeRock CREST.js requires the [`fetch`][mdn-fetch] and [`Promise`][mdn-promise] APIs to be available in the global environment.

## Supported Versions

ForgeRock CREST.js supports CREST versions 2.0 and 2.1.

```js
import { CRESTv2, CRESTv2_1 } from "@forgerock/crest-js";
```

## Installation

### via Yarn

```sh
yarn add @forgerock/crest-js
```

### via NPM

```sh
npm install @forgerock/crest-js
```

## Usage

### Basic

```js
import { CRESTv2 } from "@forgerock/crest-js";

const resource = new CRESTv2("http://www.domain.com/crest/api");

resource.get("id").then(json => {
  // Success! `json` is an Object
}, error => {
  if (error instanceof CRESTError) {
    // CREST error
  } else if (error instanceof RequestError) {
    // Request could not be completed e.g. network failure
  } else if (error instanceof ParseError) {
    // Response couldn't be parsed as JSON
  }
});
```

All the functions upon a CREST resource return Promises.

Promises allow for easily building on top of the core functionality, for example, with common handlers that deal with rejections consistently.

### Supported Methods

```js
import { CRESTv2_1 } from "@forgerock/crest-js";

const resource = new CRESTv2_1("http://www.domain.com/crest/api");
const body = { data: "value" };

// #action
resource.action("action");
resource.action("action", { body }); // Action with body

// #create
resource.create(body); // Server provided ID
resource.create(body, { id: "id" }); // Client provided ID

// #delete
resource.delete("id");

// #get
resource.get("id");

// #queryFilter
resource.queryFilter(); // Only supports `_queryFilter=true`

// #update
resource.update("id", body);
```

Pagination is currently only supported via the additional query strings option `queryString`.

See the [API Documentation][documentation] for all possible options.

### Options

#### `queryString`

For adding additional query strings to the any request.

```js
import { CRESTv2 } from "@forgerock/crest-js";

const resource = new CRESTv2("http://www.domain.com/crest/api");

resource.get("id", {
  queryString: {
      query: "value"
  }
})
// => http://www.domain.com/crest/api/id?query=value
```

Query strings applied by ForgeRock CREST.js cannot be overridden.

```js
import { CRESTv2 } from "@forgerock/crest-js";

const resource = new CRESTv2("http://www.domain.com/crest/api");

resource.action("action1", {
  queryString: {
      _action: "action2"
  }
})
// => http://www.domain.com/crest/api?_action=action1
```

### Middleware

One or many middleware can be applied to an CREST resource.

Each middleware is a function that takes a single Promise parameter, and returns a Promise to pass to the next middleware.

The first middleware in the chain is guaranteed to receive a Promise which is either resolved to a parsed JSON payload, or rejected with one of the defined error types.

```js
import { CRESTv2_1 } from "@forgerock/crest-js";

const customMiddleware = (promise) => {
  return promise.then((json) => {
    // Success! `json` is an Object
    const jsonToReturn = {
      ...json,
      myAttribute: true
    };

    // Return value will be passed the next middleware
    return json;
  }, (error) => {
    // Capture, rethrow or modify errors
    throw new CustomError(error.message);
  });
};

const resource = new CRESTv2_1("http://www.domain.com/crest/api", {
  middleware: [customMiddleware]
});
```

## Development

### Project Structure

```sh
dist/ # Output of "yarn run build".
config/ # Tooling configuration files.
docs/ # API documentation And output of "yarn run docs".
src/ # Source code.
├── .babelrc # Babel configuration for source when executing "yarn run test" or "yarn run test:coverage".
└── ...
```

### Building

Builds production CommonJS, ES and UMD versions into `/dist`.

```sh
yarn run build
```

### Docs

Generates API JSDoc into `/docs`.

```sh
yarn run docs
```

### Testing

Runs tests against the source.

```sh
yarn run test
```

The `yarn` command will pass arguments to the underlying command. For examples, use `yarn run test --verbose --watch` for continuous testing with extra output.

### Test Coverage

Generates test coverage report.

```sh
yarn run test:coverage
```

## Contributing

Contribute to ForgeRock CREST.js by opening a Pull Request.

## Further Reading

- [About ForgeRock Common REST][docs-dev-guide-about-crest]
- [Specification of the CREST HTTP protocol][forgerock-commons-protocol]

[documentation]: https://forgerock.github.io/crest-js
[docs-dev-guide-about-crest]: https://backstage.forgerock.com/docs/am/6.5/dev-guide/#sec-about-crest
[forgerock-commons-protocol]: https://stash.forgerock.org/projects/COMMONS/repos/forgerock-commons/browse/rest/Protocol.md
[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
