# Run the tests locally

Goal: run `npm test` against a real SQS compatible service.

1. Use Node 24 or later.
2. Install dependencies: `npm install`.
3. Start ElasticMQ (`softwaremill/elasticmq-native:1.7.1`) on host port
   19324:

   ```sh
   npm run services:up
   ```

   This runs `docker compose up -d --wait` with the root
   `docker-compose.yml`. The container mounts
   `test/elasticmq/elasticmq.conf`, which makes ElasticMQ build queue URLs
   from the request `Host` header, so the URLs use port 19324.
4. Run the tests:

   ```sh
   npm test
   ```

   `npm test` does not start Docker. The test reads
   `SENECA_TEST_SQS_ENDPOINT` (default `http://127.0.0.1:19324`) and sets
   `AWS_ENDPOINT_URL_SQS` from it. `AWS_REGION`, `AWS_ACCESS_KEY_ID` and
   `AWS_SECRET_ACCESS_KEY` default to dummy values.
5. Stop the service: `npm run services:down`.
