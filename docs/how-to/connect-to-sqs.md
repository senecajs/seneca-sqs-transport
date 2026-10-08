# Connect to AWS SQS or ElasticMQ

Goal: point the client side of the transport at the right SQS service.

The plugin creates `new SQSClient()` with no arguments, so the AWS SDK
takes all connection settings from its standard sources (environment
variables, `~/.aws/config`, instance roles).

1. For AWS, set the region and credentials as for any AWS SDK v3 program,
   for example `AWS_REGION=eu-west-1` and an IAM role or
   `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`.
2. For ElasticMQ or another SQS compatible server, also set the endpoint:

   ```sh
   export AWS_ENDPOINT_URL_SQS=http://127.0.0.1:19324
   export AWS_REGION=elasticmq
   export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test
   ```

3. Create the queues before calling `client`. The plugin only looks up
   queue URLs (`GetQueueUrl`), it does not create queues. Queue names are
   described in [Messages](../reference/messages.md#queue-names).
