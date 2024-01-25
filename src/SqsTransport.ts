/* Copyright © 2024 Seneca Project Contributors, MIT License. */


import {
  SQSClient,
  SendMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs"


type Options = {
  debug: boolean
  log: any[]
  prefix: string
  suffix: string
}

export type SqsTransportOptions = Partial<Options>

// Default options.
const defaults: Options = {
  debug: false,
  log: [],
  prefix: '',
  suffix: '',
}


function SqsTransport(this: any, options: Options) {
  const seneca: any = this

  const tag = seneca.plugin.tag
  const gtag = (null == tag || '-' === tag) ? '' : '$' + tag
  const gateway = seneca.export('gateway' + gtag + '/handler')

  const queueUrlMap: any = {}
  const log = options.debug && (options.log || [])

  const tu = seneca.export('transport/utils')

  const client = new SQSClient()


  seneca.add('role:transport,hook:listen,type:sqs', hook_listen_sqs)
  seneca.add('role:transport,hook:client,type:sqs', hook_client_sqs)


  function hook_listen_sqs(this: any, config: any, ready: Function) {
    const seneca = this.root.delegate()

    seneca
      .act('sys:gateway,kind:lambda,add:hook,hook:handler', {
        handler: {
          name: 'sqs',
          match: (trigger: { record: any }) => {
            // TODO: also match on pin?
            let matched = 'aws:sqs' === trigger.record.eventSource
            console.log('SQS MATCHED', matched, trigger)
            return matched
          },
          process: async function(this: typeof seneca, trigger: { record: any, event: any }) {
            const { record } = trigger
            let body = JSON.parse(record.body)
            return gateway(body, { ...trigger, gateway$: { local: true } })
          }
        }
      })

    return ready(config)
  }


  async function hook_client_sqs(this: any, config: any, ready: Function) {
    const seneca = this.root.delegate()

    const pg = seneca.util.pincanon(config.pin || config.pins)
    const queueName =
      options.prefix +
      pg
        .replace(/:/g, '_')
        .replace(/;/g, '__')
        .replace(/[^a-zA-Z0-9_]/g, '-') +
      options.suffix
    const queUrl = queueUrlMap[queueName] ??= await getQueueUrl(queueName)


    async function send_msg(msg: any, reply: any, meta: any) {

      const msgstr = JSON.stringify(tu.externalize_msg(seneca, msg, meta))
      log && log.push({
        hook: 'client', entry: 'send', pat: meta.pattern, w: Date.now(), m: meta.id
      })


      let ok = false
      let sent = null
      let params = null
      let err = null
      try {
        params = {
          QueueUrl: queUrl,
          MessageBody: msgstr
        }

        sent = await client.send(new SendMessageCommand(params))
        ok = true

        console.log("SQS SENT", sent, params)
      }
      catch (e: any) {
        err = e
        console.log("SQS SENT ERROR", err, sent, params)
      }

      reply({ ok, sent, params, err })
    }

    return ready({
      config: config,
      send: send_msg
    })
  }



  async function getQueueUrl(queueName: string) {
    try {
      const command = new GetQueueUrlCommand({ QueueName: queueName })
      const data = await client.send(command)
      return data.QueueUrl
    }
    catch (err: any) {
      console.log('SqsTransport getQueueUrl ERROR', queueName, err)
      throw err
    }
  }

  return {
    exports: {
    }
  }
}




Object.assign(SqsTransport, { defaults })

export default SqsTransport

if ('undefined' !== typeof module) {
  module.exports = SqsTransport
}
