# @seneca/sqs-transport

> _Seneca Sqs-Transport_ is a plugin for [Seneca](http://senecajs.org)

    User sqs-transportral business logic plugin for the Seneca platform.

[![npm version](https://img.shields.io/npm/v/@seneca/sqs-transport.svg)](https://npmjs.com/package/@seneca/sqs-transport)
[![build](https://github.com/senecajs/seneca-sqs-transport/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-sqs-transport/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-sqs-transport/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-sqs-transport?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-sqs-transport/badge.svg)](https://snyk.io/test/github/senecajs/seneca-sqs-transport)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/20872/branches/581541/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=20872&bid=581541)
[![Maintainability](https://api.codeclimate.com/v1/badges/8242b80adb8acb685afd/maintainability)](https://codeclimate.com/github/senecajs/seneca-sqs-transport/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

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

<!--START:options-->


## Options

* `debug` : boolean
* `log` : array
* `prefix` : string
* `suffix` : string
* `init$` : boolean


<!--END:options-->

<!--START:action-list-->


## Action Patterns

* ["role":"transport","hook":"client","type":"sqs"](#-roletransporthookclienttypesqs-)
* ["role":"transport","hook":"listen","type":"sqs"](#-roletransporthooklistentypesqs-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `"role":"transport","hook":"client","type":"sqs"` &raquo;

No description provided.



----------
### &laquo; `"role":"transport","hook":"listen","type":"sqs"` &raquo;

No description provided.



----------


<!--END:action-desc-->

## More Examples

## Motivation

## Support

## API

## Contributing

## Background
