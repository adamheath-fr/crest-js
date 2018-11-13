<div align="center">
  <img width="120" src="logo.png">
  <h1>ForgeRock CREST.js</h1>
  A Lightweight Library to Communicate With ForgeRock CREST APIs.
</div>

<!-- TOC depthFrom:2 -->

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Building](#building)
  - [Docs](#docs)
  - [Testing](#testing)
  - [Test Coverage](#test-coverage)
- [Contributing](#contributing)
- [Further Reading](#further-reading)

<!-- /TOC -->

## Prerequisites

ForgeRock CREST.js requires the [`fetch`][mdn-fetch] and [`Promise`][mdn-promise] APIs to be available in the global environment.

## Installation

```sh
# Install with Yarn
yarn add @forgerock/crest-js

# Install with NPM
npm install @forgerock/crest-js
```

## Usage

```js
import { CRESTv2 } from "forgerock-crest-js";

const resource = new CRESTv2("http://www.domain.com/crest/api");

resource.get("123").then(json => {
  // Successful request
}).catch(error => {
  if (error instanceof CRESTError) {
    // Error will contain failure details.
  } else if (error instanceof RequestError) {
    // Possible network failure.
  } else if (error instanceof ParseError) {
    // Unexpected response.
  }
});
```

All the functions upon a CREST resource return Promises.

This allows you to easily build on top of the core functionality, for example, with common handlers that deal with rejections consistently.

## Project Structure

```sh
build/ # Output of "yarn build".
config/ # Tooling configuration files.
docs/ # API documentation And output of "yarn docs".
src/ # Source code.
├── .babelrc # Babel configuration for source when executing "yarn test" or "yarn test:coverage".
└── ...
```

## Development

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

[docs-dev-guide-about-crest]: https://backstage.forgerock.com/docs/am/6/dev-guide/#sec-about-crest
[forgerock-commons-protocol]: https://stash.forgerock.org/projects/COMMONS/repos/forgerock-commons/browse/rest/Protocol.md
[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
