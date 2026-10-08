// Handle SQS records delivered to an AWS Lambda function.
// No SQS service is needed: the Lambda event is built by hand.
// Run: node docs/examples/listen-lambda.js

const Seneca = require('seneca')
const SqsTransport = require('../..')

run()

async function run() {
  const seneca = Seneca({ legacy: false })
    .quiet()
    .use('promisify')
    .use('gateway')
    .use('gateway-lambda')
    .use(SqsTransport)
    .message('color:red', async function (msg) {
      return { hex: '#ff0000', shade: msg.shade }
    })
    .listen({ type: 'sqs', pin: 'color:red' })

  await new Promise((resolve) => seneca.ready(resolve))

  // In AWS Lambda, export this function as the handler.
  const handler = seneca.export('gateway-lambda/handler')

  const out = await handler({
    Records: [
      { eventSource: 'aws:sqs', body: '{"color":"red","shade":10}' },
    ],
  })
  console.log('error:', out.error, 'out:', out.out.hex, out.out.shade)

  await new Promise((resolve) => seneca.close(resolve))
}
