# @seneca/sqs-transport documentation

The documentation follows the [Diátaxis](https://diataxis.fr) layout.

## Tutorials

| Page | What you learn |
| ---- | -------------- |
| [Getting started](tutorials/getting-started.md) | Send a Seneca message to an SQS queue and read it back. |

## How-to guides

| Page | Task |
| ---- | ---- |
| [Handle SQS records in AWS Lambda](how-to/handle-sqs-in-lambda.md) | Use `listen` with the gateway-lambda plugin. |
| [Connect to AWS SQS or ElasticMQ](how-to/connect-to-sqs.md) | Set the endpoint, region and credentials. |
| [Run the tests locally](how-to/run-the-tests-locally.md) | Start ElasticMQ with Docker and run `npm test`. |

## Reference

| Page | Contents |
| ---- | -------- |
| [Options](reference/options.md) | Plugin options and connection settings. |
| [Messages](reference/messages.md) | Action patterns, queue names and replies. |

## Explanation

| Page | Topic |
| ---- | ----- |
| [How the transport works](explanation/how-it-works.md) | Client and listen sides, Seneca 3 and 4, limits. |

## Feature index

| Feature | Kind | Documented in |
| ------- | ---- | ------------- |
| `debug` | option | [Options](reference/options.md#debug) |
| `log` | option | [Options](reference/options.md#log) |
| `prefix` | option | [Options](reference/options.md#prefix) |
| `suffix` | option | [Options](reference/options.md#suffix) |
| `AWS_ENDPOINT_URL_SQS`, `AWS_REGION`, credentials | connection setting | [Options](reference/options.md#connection-settings) |
| `role:transport,hook:client,type:sqs` | action | [Messages](reference/messages.md#roletransporthookclienttypesqs) |
| `role:transport,hook:listen,type:sqs` | action | [Messages](reference/messages.md#roletransporthooklistentypesqs) |
| Exports | export | none (the plugin exports nothing), see [Messages](reference/messages.md#exports-and-errors) |
| Error codes | error | none (the plugin defines no error codes), see [Messages](reference/messages.md#exports-and-errors) |
