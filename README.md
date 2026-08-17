![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/sqs-transport

[![npm version](https://img.shields.io/npm/v/@seneca/sqs-transport.svg)](https://npmjs.com/package/@seneca/sqs-transport)
[![build](https://github.com/senecajs/seneca-sqs-transport/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-sqs-transport/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-sqs-transport/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-sqs-transport?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-sqs-transport/badge.svg)](https://snyk.io/test/github/senecajs/seneca-sqs-transport)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/20872/branches/581541/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=20872&bid=581541)
[![Maintainability](https://api.codeclimate.com/v1/badges/8242b80adb8acb685afd/maintainability)](https://codeclimate.com/github/senecajs/seneca-sqs-transport/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

User sqs-transportral business logic plugin for the Seneca platform.

## Install

```sh
$ npm install @seneca/sqs-transport
```

## Quick Example

```js
// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca().use('sqs-transport', {})

TODO
```

## More Examples

See [test/](test/) for more usage examples.

## Motivation

A [Seneca.js](http://senecajs.org) plugin.

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-sqs-transport/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

### Options

* `debug` : boolean
* `log` : array
* `prefix` : string
* `suffix` : string
* `init$` : boolean

### Action Patterns

* [role:transport,hook:client,type:sqs](#-roletransporthookclienttypesqs-)
* [role:transport,hook:listen,type:sqs](#-roletransporthooklistentypesqs-)

### Action Descriptions

### &laquo; `role:transport,hook:client,type:sqs` &raquo;

No description provided.



----------
### &laquo; `role:transport,hook:listen,type:sqs` &raquo;

No description provided.



----------

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Part of the [Senecajs org](https://github.com/senecajs/).
