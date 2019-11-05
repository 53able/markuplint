# @markuplint/vue-parser

[![npm version](https://badge.fury.io/js/%40markuplint%2Fvue-parser.svg)](https://www.npmjs.com/package/@markuplint/vue-parser)
[![Build Status](https://travis-ci.org/markuplint/markuplint.svg?branch=next)](https://travis-ci.org/markuplint/markuplint)
[![Coverage Status](https://coveralls.io/repos/github/markuplint/markuplint/badge.svg?branch=next)](https://coveralls.io/github/markuplint/markuplint?branch=next)

## Install

Prerequisites: [Node.js](https://nodejs.org) (Version 8.0.0 or later)

```sh
$ npm install @markuplint/vue-parser

$ yarn add @markuplint/vue-parser
```

## Usage

Add `parser` option into your `.eslintrc.*` file.

```json
{
	"extends": "@markuplint/html-ls",
	"parser": {
		".vue$": "@markuplint/vue-parser"
	}
}
```

`parserOptions` option is work in progress. current setting is `{ "sourceType": "module" }` that hard coded.

## Contributing

```
$ git clone git@github.com:markuplint/markuplint.git -b next
$ yarn
$ yarn build
$ yarn test
```

---

Copyright &copy; 2019 markuplint. Unter the MIT License.