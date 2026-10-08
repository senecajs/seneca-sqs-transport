// Send Seneca messages to an SQS queue (ElasticMQ from docker-compose.yml).
// Run: npm run services:up && node docs/examples/client.js

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
const SqsTransport = require('../..')

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
