<div align="center">
  <img width="120" src="logo.png">
  <h1>ForgeRock CREST.js</h1>
  A Lightweight Library to Communicate With ForgeRock CREST APIs.
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
  // Success!
}).catch(error => {
  if (error instanceof CRESTError) {
    // CREST error.
  } else if (error instanceof RequestError) {
    // Request could not be completed e.g. network failure.
  } else if (error instanceof ParseError) {
    // Response couldn't be parsed as JSON
  }
});
```

All the functions upon a CREST resource return Promises.

This allows you to easily build on top of the core functionality, for example, with common handlers that deal with rejections consistently.

### Supported Methods

```js
import { CRESTv2_1 } from "@forgerock/crest-js";

const resource = new CRESTv2_1("http://www.domain.com/crest/api");
const body = { data: "value" };

resource.action("action");
resource.create(body, "id");
resource.delete("id");
resource.get("id");
resource.queryFilter();
resource.update("id", body);
```

See the [API Documentation][documentation] for all possible options.

## Development

### Project Structure

```sh
build/ # Output of "yarn build".
config/ # Tooling configuration files.
docs/ # API documentation And output of "yarn docs".
src/ # Source code.
├── .babelrc # Babel configuration for source when executing "yarn test" or "yarn test:coverage".
└── ...
```

### Building

Builds a production UMD version into `/build`.

```sh
yarn build
```

### Docs

Generates API JSDoc into `/docs`.

```sh
yarn docs
```

### Testing

Runs tests against the source.

```sh
yarn test
```

The `yarn` command will pass arguments to the underlying command. For examples, use `yarn test --verbose --watch` for continuous testing with extra output.

### Test Coverage

Generates test coverage report.

```sh
yarn test:coverage
```

## Contributing

Contribute to ForgeRock CREST.js by opening a Pull Request.

## Further Reading

- [About ForgeRock Common REST][docs-dev-guide-about-crest]
- [Specification of the CREST HTTP protocol][forgerock-commons-protocol]

[documentation]: https://forgerock.github.io/crest-js
[docs-dev-guide-about-crest]: https://backstage.forgerock.com/docs/am/6/dev-guide/#sec-about-crest
[forgerock-commons-protocol]: https://stash.forgerock.org/projects/COMMONS/repos/forgerock-commons/browse/rest/Protocol.md
[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
