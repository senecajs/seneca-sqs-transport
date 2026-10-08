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

An AWS SQS transport for [Seneca](http://senecajs.org): `client` sends
messages to SQS queues, and `listen` handles SQS records delivered to an
AWS Lambda function (through `@seneca/gateway-lambda`). Works with Seneca 3
and the Seneca 4 prerelease (`seneca@4.0.0-rc5`), on Node 22 and 24.

## Install

```sh
npm install @seneca/sqs-transport @aws-sdk/client-sqs \
  seneca-promisify @seneca/gateway @seneca/gateway-lambda
```

## Quick Example

```js
const Seneca = require('seneca')

const seneca = Seneca({ legacy: false })
  .use('promisify')
  .use('gateway')
  .use('gateway-lambda')
  .use('@seneca/sqs-transport', { prefix: 'demo-' })
  .client({ type: 'sqs', pin: 'color:red' })

// Sent as JSON to the existing SQS queue 'demo-color_red'.
const out = await seneca.post('color:red,shade:10')
// out.ok === true when SQS accepted the message
```

The AWS SDK reads endpoint, region and credentials from its usual sources
(for example `AWS_REGION`, `AWS_ENDPOINT_URL_SQS`).

## More Examples

* Tutorial: [Getting started](docs/tutorials/getting-started.md)
* [Handle SQS records in AWS Lambda](docs/how-to/handle-sqs-in-lambda.md)
* [Connect to AWS SQS or ElasticMQ](docs/how-to/connect-to-sqs.md)
* Runnable programs: [docs/examples](docs/examples/client.js)

## Motivation

SQS is a simple way to decouple services on AWS, and Lambda is a common
way to consume it. This plugin lets Seneca code publish to SQS and run
Seneca actions for SQS records without hand written glue. See
[How the transport works](docs/explanation/how-it-works.md).

## Support

* [GitHub issues](https://github.com/senecajs/seneca-sqs-transport/issues)
* [Seneca documentation](http://senecajs.org)
* Sponsored by [Voxgig](https://www.voxgig.com)

## API

Full index: [docs/README.md](docs/README.md).

| Option | Default | Reference |
| ------ | ------- | --------- |
| `debug` | `false` | [options](docs/reference/options.md#debug) |
| `log` | `[]` | [options](docs/reference/options.md#log) |
| `prefix` | `''` | [options](docs/reference/options.md#prefix) |
| `suffix` | `''` | [options](docs/reference/options.md#suffix) |

| Action pattern | Reference |
| -------------- | --------- |
| `role:transport,hook:client,type:sqs` | [messages](docs/reference/messages.md#roletransporthookclienttypesqs) |
| `role:transport,hook:listen,type:sqs` | [messages](docs/reference/messages.md#roletransporthooklistentypesqs) |

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open
participation. To run the tests (Node 24 or 22, Seneca 4 prerelease as
devDependency), start ElasticMQ with Docker first:

```sh
npm install
npm run services:up
npm test
npm run services:down
```

See [Run the tests locally](docs/how-to/run-the-tests-locally.md). CI
workflow changes are kept as patches in `.patches/` (apply with
`git am .patches/*.patch`).

## Background

Part of the [Senecajs org](https://github.com/senecajs/). History of
changes: [CHANGES.md](CHANGES.md).

| Seneca | Node | Status |
| ------ | ---- | ------ |
| 3.x | 18+ | allowed by the peer range, not tested in CI |
| 4.0.0-rc5, 4.0.0 | 22, 24 | tested |

License: [MIT](LICENSE).
