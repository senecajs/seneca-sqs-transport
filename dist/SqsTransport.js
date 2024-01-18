"use strict";
/* Copyright © 2024 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
// Default options.
const defaults = {
    debug: false,
    log: [],
};
function SqsTransport(options) {
    const seneca = this;
    const tag = seneca.plugin.tag;
    const gtag = (null == tag || '-' === tag) ? '' : '$' + tag;
    const gateway = seneca.export('gateway' + gtag + '/handler');
    const queueUrlMap = {};
    const log = options.debug && (options.log || []);
    const tu = seneca.export('transport/utils');
    const client = new client_sqs_1.SQSClient();
    seneca.add('role:transport,hook:listen,type:sqs', hook_listen_sqs);
    seneca.add('role:transport,hook:client,type:sqs', hook_client_sqs);
    function hook_listen_sqs(config, ready) {
        const seneca = this.root.delegate();
        seneca
            .act('sys:gateway,kind:lambda,add:hook,hook:handler', {
            handler: {
                name: 'sqs',
                match: (event) => {
                    var _a;
                    // TODO: also match on pin?
                    let matched = 'aws:sqs' === (event.Records && ((_a = event.Records[0]) === null || _a === void 0 ? void 0 : _a.eventSource));
                    console.log('SQS MATCHED', matched, event);
                    return matched;
                },
                process: async function (event, context) {
                    let body = JSON.parse(event.Records[0].body);
                    return gateway(body, { event, context });
                }
            }
        });
        return ready(config);
    }
    async function hook_client_sqs(config, ready) {
        var _a;
        const seneca = this.root.delegate();
        const pg = seneca.util.pincanon(config.pin || config.pins);
        const queueName = pg.replace(/:/g, '_').replace(/;/g, '__').replace(/[^a-zA-Z0-9_]/g, '-');
        const queUrl = (_a = queueUrlMap[queueName]) !== null && _a !== void 0 ? _a : (queueUrlMap[queueName] = await getQueueUrl(queueName));
        async function send_msg(msg, reply, meta) {
            const msgstr = JSON.stringify(tu.externalize_msg(seneca, msg, meta));
            log && log.push({
                hook: 'client', entry: 'send', pat: meta.pattern, w: Date.now(), m: meta.id
            });
            let ok = false;
            let sent = null;
            let params = null;
            let err = null;
            try {
                params = {
                    QueueUrl: queUrl,
                    MessageBody: msgstr
                };
                sent = await client.send(new client_sqs_1.SendMessageCommand(params));
                ok = true;
                console.log("SQS SENT", sent, params);
            }
            catch (e) {
                err = e;
                console.log("SQS SENT ERROR", err, sent, params);
            }
            reply({ ok, sent, params, err });
        }
        return ready({
            config: config,
            send: send_msg
        });
    }
    async function getQueueUrl(queueName) {
        try {
            const command = new client_sqs_1.GetQueueUrlCommand({ QueueName: queueName });
            const data = await client.send(command);
            return data.QueueUrl;
        }
        catch (err) {
            console.log('SqsTransport getQueueUrl ERROR', queueName, err);
            throw err;
        }
    }
    return {
        exports: {}
    };
}
Object.assign(SqsTransport, { defaults });
exports.default = SqsTransport;
if ('undefined' !== typeof module) {
    module.exports = SqsTransport;
}
//# sourceMappingURL=SqsTransport.js.map