# Options

Pass options with `seneca.use('@seneca/sqs-transport', { ... })` or under
`options.plugin` in the Seneca options. Source: `src/SqsTransport.ts`.

| Option | Type | Default | Effect |
| ------ | ---- | ------- | ------ |
| `debug` | boolean | `false` | When true, client sends are recorded in `log`. |
| `log` | array | `[]` | Array that receives `{ hook, entry, pat, w, m }` records when `debug` is true. |
| `prefix` | string | `''` | Prepended to every client queue name. |
| `suffix` | string | `''` | Appended to every client queue name. |

## debug

Enables the `log` array. It does not control the `console.log` output of
the plugin, which is always printed.

## log

Each client send pushes `{ hook: 'client', entry: 'send', pat, w, m }`:
the message pattern, the time in milliseconds, and the message id.

## prefix

See [queue names](messages.md#queue-names).

## suffix

See [queue names](messages.md#queue-names).

## Connection settings

The SQS client is created as `new SQSClient()`, so it reads the standard
AWS SDK v3 settings:

| Variable | Use |
| -------- | --- |
| `AWS_ENDPOINT_URL_SQS` | SQS endpoint. Set it for ElasticMQ (`http://127.0.0.1:19324` in this repository). |
| `AWS_REGION` | Region. Required. |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Credentials (or any other AWS credential source). |

The tests read `SENECA_TEST_SQS_ENDPOINT` (default
`http://127.0.0.1:19324`) and copy it to `AWS_ENDPOINT_URL_SQS`.
