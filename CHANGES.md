# Changes

## 0.7.0

* Seneca 4 prerelease support: tests run on `seneca@4.0.0-rc5` and the
  4.0.0 build; `seneca`, `seneca-promisify`, `seneca-entity`,
  `@seneca/gateway` and `@seneca/gateway-lambda` are devDependencies.
* Node 24 and 22 in CI (workflow delivered in `.patches/`);
  `engines.node` raised to `>=18`.
* Tests: real client and listen tests against ElasticMQ, started with
  `npm run services:up` (docker-compose.yml, host port 19324).
* Documentation reorganized into `docs/` (Diátaxis).
* No behaviour change.
