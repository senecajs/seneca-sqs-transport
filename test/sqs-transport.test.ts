/* Copyright © 2022-2024 Seneca Project Contributors, MIT License. */

// Connection settings for the SQS compatible service (ElasticMQ by
// default, see docker-compose.yml). The AWS SDK reads the endpoint,
// region and credentials from these environment variables.
const SQS_ENDPOINT =
  process.env.SENECA_TEST_SQS_ENDPOINT || 'http://127.0.0.1:19324'
process.env.AWS_ENDPOINT_URL_SQS = SQS_ENDPOINT
process.env.AWS_REGION = process.env.AWS_REGION || 'elasticmq'
process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'test'
process.env.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'test'

import Seneca from 'seneca'
import {
  SQSClient,
  CreateQueueCommand,
  DeleteQueueCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs'

import SqsTransportDoc from '../src/SqsTransportDoc'
import SqsTransport from '../src/SqsTransport'

const sqs = new SQSClient({})

function makeSeneca(opts: any = {}) {
  return Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('gateway')
    .use('gateway-lambda')
    .use(SqsTransport, opts)
}

function ready(seneca: any) {
  return new Promise((resolve) => seneca.ready(resolve))
}

function close(seneca: any) {
  return new Promise((resolve) => seneca.close(resolve))
}

describe('sqs-transport', () => {
  afterAll(() => sqs.destroy())

  test('happy', async () => {
    expect(SqsTransportDoc).toBeDefined()
    const seneca = makeSeneca()
    await ready(seneca)
    await close(seneca)
  })

  test('client-send', async () => {
    const queueName = 'pre-a_1-suf'
    const created = await sqs.send(
      new CreateQueueCommand({ QueueName: queueName }),
    )
    const QueueUrl = created.QueueUrl as string

    try {
      const seneca = makeSeneca({ prefix: 'pre-', suffix: '-suf' })
      seneca.client({ type: 'sqs', pin: 'a:1' })
      await ready(seneca)

      const out = await seneca.post('a:1,x:2')
      expect(out.ok).toEqual(true)
      expect(out.sent.MessageId).toBeDefined()

      const recv = await sqs.send(
        new ReceiveMessageCommand({ QueueUrl, WaitTimeSeconds: 1 }),
      )
      expect(recv.Messages?.length).toEqual(1)
      const body = JSON.parse(recv.Messages?.[0].Body as string)
      expect(body.a).toEqual(1)
      expect(body.x).toEqual(2)

      await close(seneca)
    } finally {
      await sqs.send(new DeleteQueueCommand({ QueueUrl }))
    }
  })

  test('listen-lambda', async () => {
    const seneca = makeSeneca()
    seneca.message('a:1', async function (msg: any) {
      return { x: 1 + msg.x }
    })
    seneca.listen({ type: 'sqs', pin: 'a:1' })
    await ready(seneca)

    const handler = seneca.export('gateway-lambda/handler')
    const out = await handler({
      Records: [{ eventSource: 'aws:sqs', body: '{"a":1,"x":1}' }],
    })
    expect(out.error).toEqual(false)
    expect(out.out.x).toEqual(2)

    await close(seneca)
  })
})
