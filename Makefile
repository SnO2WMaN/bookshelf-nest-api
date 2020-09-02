ENV_LOCAL_FILE := .env
ENV_LOCAL = $(shell cat $(ENV_LOCAL_FILE))

.PHONY: dc-up-local
dc-up-local:
	cd docker/mongo/sample; git pull
	make -C docker/mongo/sample bundle
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.local.yml \
    -p local up -d

.PHONY: dc-down-local
dc-down-local:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.local.yml \
    -p local down

.PHONY: dc-up-prod
dc-up-prod:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.prod.yml \
    -p prod up -d --build

.PHONY: dc-down-prod
dc-down-prod:
	$(ENV_LOCAL) docker-compose \
    -f docker/docker-compose.deps.base.yml \
    -f docker/docker-compose.deps.prod.yml \
    -p prod down
