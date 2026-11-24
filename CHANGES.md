# Changes

## 0.7.0 2026-11-21

* Seneca 4: the peer dependency is `seneca` `^4.0.0` (0.6.0 had
  `>=3||>=4.0.0-rc2`). Seneca 3 users stay on `@seneca/sqs-transport@0.6`.
* Node.js 24 or later (`engines.node` `>=24`).
* `@aws-sdk/client-sqs` is a runtime dependency. The plugin imports it at
  load time, but 0.6.0 listed it only as a development dependency, so
  the package failed to load unless the application installed it.
* The peer dependencies `@seneca/gateway` and `@seneca/gateway-lambda`
  are `^2.0.0` (were `>=1.3` and `>=1.1`), the Seneca 4 releases, and are
  optional: only the listen side needs them. `@seneca/gateway-lambda` 1.x
  stops on Seneca 4 with `plugin_gubu_shape`.
* The peer dependencies `seneca-entity` and `seneca-promisify` are
  removed; the plugin uses neither. npm installed `seneca-entity` 28 for
  every application, and Seneca 4 rejects it with `plugin_gubu_shape`.
  Seneca 4 has promises built in (D4).
* The unused runtime dependency `async` is removed.
* The plugin stops at load with a clear message when the
  `transport/utils` export lacks `externalize_msg`, as it does when
  `seneca-transport` 8 or older is loaded first. `@seneca/transport` 9
  keeps it.
* TypeScript: the plugin function is typed `this: Seneca.Instance`, with
  a type-only import of `seneca` (B10). The declaration file now imports
  the `seneca` types.
* Tests: real client and listen tests against ElasticMQ, started with
  `npm run services:up` (docker-compose.yml, host port 19324). The
  client test runs without the gateway plugins, and also with
  `@seneca/transport` loaded first. New tests cover loading without the
  gateway plugins and the `transport/utils` check. Plugins are loaded by
  their full names (B14), and no longer with `seneca-promisify` or
  `seneca-entity`. Live AWS SQS calls were not tested on Seneca 4.
* Development dependencies: `seneca` `^4.0.0`, `@seneca/gateway`
  `^2.0.0`, `@seneca/gateway-lambda` `^2.0.0`, `@seneca/transport`
  `^9.0.0`, `@seneca/doc` `^9.0.0` and `@types/node` `^24.0.0`;
  `seneca-entity`, `seneca-promisify`, `@types/async` and the unused
  `@seneca/maintain` are removed.
* `repository.url` uses `git+https`, `publishConfig.access` is
  `public`, README.md and CHANGES.md are in the package, and the package
  description names SQS. The local publish scripts are removed.
* CI workflow (ElasticMQ) delivered in `.patches/`.
* Documentation reorganized into `docs/` (Diátaxis), and updated for
  Seneca 4 and Node 24.
