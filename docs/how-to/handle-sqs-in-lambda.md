# Handle SQS records in AWS Lambda

Goal: run Seneca actions for messages that SQS delivers to a Lambda
function.

1. Load `seneca-promisify`, `@seneca/gateway` and `@seneca/gateway-lambda`
   before this plugin. The plugin reads the `gateway/handler` export when
   it starts.
2. Add your actions and call `listen({ type: 'sqs', pin: ... })`.
3. Export the `gateway-lambda/handler` function as the Lambda handler.

```js
const seneca = Seneca({ legacy: false })
  .use('promisify')
  .use('gateway')
  .use('gateway-lambda')
  .use('@seneca/sqs-transport')
  .message('color:red', async function (msg) {
    return { hex: '#ff0000', shade: msg.shade }
  })
  .listen({ type: 'sqs', pin: 'color:red' })

await new Promise((resolve) => seneca.ready(resolve))
const handler = seneca.export('gateway-lambda/handler')
```

Each record with `eventSource: 'aws:sqs'` has its `body` parsed as JSON
and submitted as a Seneca message. The full program, which calls the
handler with a hand built event, is
[`docs/examples/listen-lambda.js`](../examples/listen-lambda.js). Output:

```
SQS MATCHED true undefined {"color":"red","shade":10}
error: false out: #ff0000 10
```

The `pin` given to `listen` is not used to filter records: every SQS
record is accepted.
