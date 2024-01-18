
const Seneca = require('seneca')

run()

async function run() {
  const log = []
  
  const seneca = await Seneca({legacy:false,timeout:1111})
        .test('print')
        .use('promisify')
        .use('gateway')
        .use('gateway-lambda')
        .use('..', {debug:true,log})

        .message('a:1', async function(msg) {
          return { x: 1 + msg.x }
        })

        .listen({type:'sqs',pin:'a:1'})
        // .client({type:'sqs',pin:'a:1'})

        .ready()

  /*
  let o1 = await seneca.post('a:1,x:1')
  console.log('OUT', o1)

  await seneca.ready()
  
  console.log(log)
  */

  let handler = seneca.export('gateway-lambda/handler')
  console.log('handler', handler)

  let handlers = seneca.export('gateway-lambda/handlers')
  console.log('handlers', handlers())

  let out = await handler({ Records: [{ eventSource: 'aws:sqs', body: '{"a":1,"x":1}' }] })
  console.log('HOUT', out)
  
}
