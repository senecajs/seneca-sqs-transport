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

## Seneca 3 and Seneca 4

The plugin uses only APIs that both versions keep: `seneca.add`,
`seneca.export`, `delegate`, `util.pincanon` and the `transport/utils`
export. Seneca 4 has no network transports in core, but the
`role:transport,hook:*` hook mechanism used by `client` and `listen` is
still there, so this plugin works without `seneca-transport`. The tests
run on Seneca 4.0.0-rc5 and the 4.0.0 build.

## Limits

* Queues must already exist; the plugin does not create them.
* The SQS client has no plugin options for endpoint, region or
  credentials; it uses the AWS SDK defaults.
* The listen side accepts every SQS record, whatever its queue or pin.
* The plugin prints debug lines with `console.log` on every send and
  every matched record.
