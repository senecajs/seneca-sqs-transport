# How the transport works

## Two separate sides

The client side and the listen side do not talk to each other through
this plugin.

* The client side publishes messages to SQS queues with the AWS SDK. It
  does not wait for a remote result: the reply only says whether SQS
  accepted the message. This suits fire and forget work.
* The listen side does not poll SQS. It relies on AWS Lambda: SQS invokes
  the Lambda function, and `@seneca/gateway-lambda` passes each SQS record
  to this plugin, which submits the record body as a Seneca message.

So a typical system has a Seneca service that sends with `client` and a
Lambda function that receives with `listen`.

## Why it is built on the gateway plugins

`@seneca/gateway` already turns external JSON into Seneca messages,
handles `meta$` and decides which fields are safe. The lambda gateway
knows the Lambda event format. Reusing them keeps this plugin small: it
only adds the SQS specific matching and the queue naming.

## Seneca 4

Version 0.7 runs on Seneca 4 only; Seneca 3 users stay on 0.6. The plugin
uses `seneca.add`, `seneca.export`, `delegate`, `util.pincanon` and the
`externalize_msg` helper of the `transport/utils` export. Seneca 4 has no
network transports in core, but the `role:transport,hook:*` hook mechanism
used by `client` and `listen` is still there, so this plugin works without
`@seneca/transport`. `@seneca/transport` 9 keeps `externalize_msg` when it
replaces the `transport/utils` export. `seneca-transport` 8 does not, so
the plugin stops at load with an error if it is loaded first.

The gateway plugins are optional peer dependencies: only the listen side
needs them.

## Limits

* Queues must already exist; the plugin does not create them.
* The SQS client has no plugin options for endpoint, region or
  credentials; it uses the AWS SDK defaults.
* The listen side accepts every SQS record, whatever its queue or pin.
* The plugin prints debug lines with `console.log` on every send and
  every matched record.
