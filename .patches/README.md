# Patches

Changes to `.github/workflows/` that could not be pushed from the session
that prepared this branch (pushing workflow files needs the GitHub
`workflow` scope). Apply them with:

```sh
git am .patches/*.patch
```

`0001-ci-node-24-22-elasticmq.patch` updates `build.yml`: Node 24.x and
22.x matrix, triggers on `master` and `main`, and an ElasticMQ
(`softwaremill/elasticmq-native:1.7.1`) container on host port 19324.

ElasticMQ is started with `docker run` in a job step and not as a GitHub
Actions service container. It needs `test/elasticmq/elasticmq.conf` from
the checkout (queue URLs must use the mapped host port), and service
containers start before the checkout and cannot mount repository files.
The step uses the same health check as `docker-compose.yml` (`wget` on
`?Action=ListQueues`) and waits until the container is healthy.
