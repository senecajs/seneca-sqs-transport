/* Copyright © 2022-2024 Seneca Project Contributors, MIT License. */

import Seneca from 'seneca'
// import SenecaMsgTest from 'seneca-msg-test'
// import { Maintain } from '@seneca/maintain'

import SqsTransportDoc from '../src/SqsTransportDoc'
import SqsTransport from '../src/SqsTransport'



describe('sqs-transport', () => {
  test('happy', async () => {
    expect(SqsTransportDoc).toBeDefined()
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use(SqsTransport)
    await seneca.ready()
  })
})
