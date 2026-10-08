# Getting started

In this tutorial you send a Seneca message to an SQS queue and read it
back. You use ElasticMQ, a local SQS compatible server, so no AWS account
is needed.

## 1. Install

```sh
npm install seneca@^4.0.0-rc5 seneca-promisify @seneca/gateway \
  @seneca/gateway-lambda @seneca/sqs-transport @aws-sdk/client-sqs
```

The plugin works with Seneca 3 and with the Seneca 4 prerelease.

## 2. Start ElasticMQ

From a clone of this repository:

```sh
npm run services:up
```

ElasticMQ listens on `http://127.0.0.1:19324`.

## 3. Write the program

The program is [`docs/examples/client.js`](../examples/client.js):

```js
process.env.AWS_ENDPOINT_URL_SQS ??= 'http://127.0.0.1:19324'
process.env.AWS_REGION ??= 'elasticmq'
process.env.AWS_ACCESS_KEY_ID ??= 'test'
process.env.AWS_SECRET_ACCESS_KEY ??= 'test'

const Seneca = require('seneca')
const {
  SQSClient,
  CreateQueueCommand,
  ReceiveMessageCommand,
  DeleteQueueCommand,
} = require('@aws-sdk/client-sqs')
const SqsTransport = require('@seneca/sqs-transport')

run()

async function run() {
  const sqs = new SQSClient({})

  // The queue for pin 'color:red' is named 'demo-color_red'.
  const { QueueUrl } = await sqs.send(
    new CreateQueueCommand({ QueueName: 'demo-color_red' }),
  )

  const seneca = Seneca({ legacy: false })
    .quiet()
    .use('promisify')
    .use('gateway')
    .use('gateway-lambda')
    .use(SqsTransport, { prefix: 'demo-' })
    .client({ type: 'sqs', pin: 'color:red' })

  await new Promise((resolve) => seneca.ready(resolve))

  const out = await seneca.post('color:red,shade:10')
  console.log('reply ok:', out.ok, 'queue:', out.params.QueueUrl)

  const recv = await sqs.send(
    new ReceiveMessageCommand({ QueueUrl, WaitTimeSeconds: 1 }),
  )
  const body = JSON.parse(recv.Messages[0].Body)
  console.log('queued message:', body.color, body.shade)

  await new Promise((resolve) => seneca.close(resolve))
  await sqs.send(new DeleteQueueCommand({ QueueUrl }))
  sqs.destroy()
}
```

## 4. Run it

```sh
node docs/examples/client.js
```

Output (the plugin also prints a `SQS SENT` debug line, shortened here):

```
SQS SENT { MD5OfMessageBody: '...', MessageId: '...', ... }
reply ok: true queue: http://127.0.0.1:19324/000000000000/demo-color_red
queued message: red 10
```

## What happened

1. `client({ type: 'sqs', pin: 'color:red' })` looked up the URL of the
   queue `demo-color_red` (prefix + pin).
2. `seneca.post('color:red,shade:10')` sent the message, with its
   `meta$` data, as JSON to that queue.
3. The reply is not a result from a remote action. It reports whether
   SQS accepted the message (`ok`, `sent`, `params`, `err`).

## Next steps

* [Handle SQS records in AWS Lambda](../how-to/handle-sqs-in-lambda.md)
* [How the transport works](../explanation/how-it-works.md)
