# Messages

The plugin adds two transport hooks. Seneca calls them from
`seneca.client()` and `seneca.listen()` with `type: 'sqs'`; you do not
call them directly.

## role:transport,hook:client,type:sqs

Called by `seneca.client({ type: 'sqs', pin })`.

* Parameters: the client config. `pin` (or `pins`) selects the messages
  that are sent and the queue name.
* Effect: looks up the queue URL with `GetQueueUrl` once per queue name.
  If the queue does not exist the error is thrown and the client is not
  set up.
* Each matching message is sent with `SendMessage`. The body is the
  message with its `meta$` data as JSON.
* Reply to the sender: `{ ok, sent, params, err }`. `ok` is true when SQS
  accepted the message, `sent` is the `SendMessage` result, `params` holds
  `QueueUrl` and `MessageBody`, and `err` is the SQS error or `null`.
  An SQS error is returned in `err`, not raised.

### Queue names

`prefix` + canonical pin + `suffix`, where in the canonical pin (as
returned by `seneca.util.pincanon`) `:` becomes `_`, `;` becomes `__`, and
any other character that is not a letter, digit or `_` becomes `-`.

| pin | prefix | suffix | queue name |
| --- | ------ | ------ | ---------- |
| `a:1` | `''` | `''` | `a_1` |
| `color:red` | `demo-` | `''` | `demo-color_red` |
| `a:1` | `pre-` | `-suf` | `pre-a_1-suf` |

## role:transport,hook:listen,type:sqs

Called by `seneca.listen({ type: 'sqs' })`.

* Effect: registers a handler named `sqs` with
  `sys:gateway,kind:lambda,add:hook,hook:handler`.
* The handler matches every Lambda record whose `eventSource` is
  `aws:sqs`. The `pin` is not used for matching.
* For a matched record, `body` is parsed as JSON and passed to the
  `gateway/handler` export with `gateway$: { local: true }`. The result
  is the gateway result, for example `{ error: false, out: {...} }`.
* Requires `@seneca/gateway` and `@seneca/gateway-lambda` (loaded before
  this plugin).

## Exports and errors

The plugin has no exports and defines no error codes.
